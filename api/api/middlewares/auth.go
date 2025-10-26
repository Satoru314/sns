package middlewares

import (
	"context"
	"errors"
	"net/http"
	"os"
	"strings"

	"github.com/yourname/reponame/apperrors"
	"github.com/yourname/reponame/common"
	"google.golang.org/api/idtoken"
)

func getGoogleClientID() string {
	clientID := os.Getenv("GOOGLE_CLIENT_ID")
	if clientID == "" {
		return "[yourClientID]" // フォールバック
	}
	return clientID
}

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		// /auth/* エンドポイントは認証をスキップ
		if strings.HasPrefix(req.URL.Path, "/auth/") {
			next.ServeHTTP(w, req)
			return
		}

		// まずcookieからトークンを取得
		var idToken string
		cookie, err := req.Cookie("google_id_token")
		if err == nil && cookie.Value != "" {
			idToken = cookie.Value
		} else {
			// cookieがない場合はAuthorizationヘッダーから取得（後方互換性）
			authorization := req.Header.Get("Authorization")
			authHeaders := strings.Split(authorization, " ")
			if len(authHeaders) != 2 {
				err := apperrors.RequiredAuthorizationHeader.Wrap(errors.New("invalid req header"), "invalid header")
				apperrors.ErrorHandler(w, req, err)
				return
			}

			bearer, token := authHeaders[0], authHeaders[1]
			if bearer != "Bearer" || token == "" {
				err := apperrors.RequiredAuthorizationHeader.Wrap(errors.New("invalid req header"), "invalid header")
				apperrors.ErrorHandler(w, req, err)
				return
			}
			idToken = token
		}

		// IDトークン検証（ADC不要の方法）
		payload, err := idtoken.Validate(context.Background(), idToken, getGoogleClientID())
		if err != nil {
			err = apperrors.Unauthorizated.Wrap(err, "invalid id token")
			apperrors.ErrorHandler(w, req, err)
			return
		}

		// nameフィールドをpayloadから抜き出す
		name, ok := payload.Claims["name"]
		if !ok {
			err = apperrors.Unauthorizated.Wrap(err, "invalid id token")
			apperrors.ErrorHandler(w, req, err)
			return
		}

		// contextにユーザー名をセット
		req = common.SetUserName(req, name.(string))

		// 本物のハンドラへ
		next.ServeHTTP(w, req)
	})
}
