package controllers

import (
	"context"
	"encoding/json"
	"net/http"
	"os"
	"time"

	"google.golang.org/api/idtoken"
)

type AuthController struct{}

func NewAuthController() *AuthController {
	return &AuthController{}
}

type LoginRequest struct {
	IDToken string `json:"idToken"`
}

type LoginResponse struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Picture string `json:"picture"`
}

// LoginHandler godoc
// @Summary Google OAuth Login
// @Description Validate Google ID token and set HttpOnly cookie
// @Tags auth
// @Accept json
// @Produce json
// @Param loginRequest body LoginRequest true "Google ID Token"
// @Success 200 {object} LoginResponse
// @Router /auth/login [post]
func (c *AuthController) LoginHandler(w http.ResponseWriter, req *http.Request) {
	var loginReq LoginRequest
	if err := json.NewDecoder(req.Body).Decode(&loginReq); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Google Client IDを取得
	googleClientID := os.Getenv("GOOGLE_CLIENT_ID")
	if googleClientID == "" {
		http.Error(w, "Server configuration error", http.StatusInternalServerError)
		return
	}

	// IDトークンを検証（ADC不要の方法）
	payload, err := idtoken.Validate(context.Background(), loginReq.IDToken, googleClientID)
	if err != nil {
		http.Error(w, "Invalid ID token", http.StatusUnauthorized)
		return
	}

	// ユーザー情報を抽出
	name, _ := payload.Claims["name"].(string)
	email, _ := payload.Claims["email"].(string)
	picture, _ := payload.Claims["picture"].(string)

	// HttpOnly cookieにIDトークンを保存
	http.SetCookie(w, &http.Cookie{
		Name:     "google_id_token",
		Value:    loginReq.IDToken,
		Path:     "/",
		HttpOnly: true,
		Secure:   false, // 開発環境ではfalse、本番環境ではtrue
		SameSite: http.SameSiteLaxMode,
		MaxAge:   3600, // 1時間
	})

	// ユーザー情報をレスポンス
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(LoginResponse{
		Name:    name,
		Email:   email,
		Picture: picture,
	})
}

// LogoutHandler godoc
// @Summary Logout
// @Description Clear authentication cookie
// @Tags auth
// @Success 200
// @Router /auth/logout [post]
func (c *AuthController) LogoutHandler(w http.ResponseWriter, req *http.Request) {
	// cookieを削除
	http.SetCookie(w, &http.Cookie{
		Name:     "google_id_token",
		Value:    "",
		Path:     "/",
		HttpOnly: true,
		MaxAge:   -1,
		Expires:  time.Unix(0, 0),
	})

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Logged out successfully"))
}
