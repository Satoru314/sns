package controllers

import (
	"encoding/json"
	"io"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/yourname/reponame/apperrors"
	"github.com/yourname/reponame/controllers/services"
	"github.com/yourname/reponame/models"
)

type ArticleController struct {
	service services.ArticleServicer
}

func NewArticleController(s services.ArticleServicer) *ArticleController {
	return &ArticleController{service: s}
}

// HelloHandler godoc
// @Summary Hello World
// @Description Returns hello world message
// @Tags hello
// @Accept json
// @Produce plain
// @Success 200 {string} string "Hello, world!"
// @Router /hello [get]
func (c *ArticleController) HelloHandler(w http.ResponseWriter, req *http.Request) {
	io.WriteString(w, "Hello, world!\n")
}

// PostArticleHandler godoc
// @Summary Create a new article
// @Description Post a new article
// @Tags articles
// @Accept json
// @Produce json
// @Param article body models.Article true "Article object"
// @Success 200 {object} models.Article
// @Router /article [post]
func (c *ArticleController) PostArticleHandler(w http.ResponseWriter, req *http.Request) {
	var reqArticle models.Article
	if err := json.NewDecoder(req.Body).Decode(&reqArticle); err != nil {
		err = apperrors.ReqBodyDecodeFailed.Wrap(err, "bad request body")
		apperrors.ErrorHandler(w, req, err)
		return
	}

	// TODO: 認証機能を実装する際に有効化する
	// authedUserName := common.GetUserName(req.Context())
	// if reqArticle.UserName != authedUserName {
	// 	err := apperrors.NotMatchUser.Wrap(errors.New("does not match reqBody user and idtoken user"), "invalid parameter")
	// 	apperrors.ErrorHandler(w, req, err)
	// 	return
	// }

	article, err := c.service.PostArticleService(reqArticle)
	if err != nil {
		apperrors.ErrorHandler(w, req, err)
		return
	}

	json.NewEncoder(w).Encode(article)
}

// ArticleListHandler godoc
// @Summary Get article list
// @Description Get paginated article list
// @Tags articles
// @Accept json
// @Produce json
// @Param page query int false "Page number" default(1)
// @Success 200 {array} models.Article
// @Router /article/list [get]
func (c *ArticleController) ArticleListHandler(w http.ResponseWriter, req *http.Request) {
	queryMap := req.URL.Query()

	// クエリパラメータpageを取得
	var page int
	if p, ok := queryMap["page"]; ok && len(p) > 0 {
		var err error
		page, err = strconv.Atoi(p[0])
		if err != nil {
			err = apperrors.BadParam.Wrap(err, "queryparam must be number")
			apperrors.ErrorHandler(w, req, err)
			return
		}
	} else {
		page = 1
	}

	articleList, err := c.service.GetArticleListService(page)
	if err != nil {
		apperrors.ErrorHandler(w, req, err)
		return
	}

	json.NewEncoder(w).Encode(articleList)
}

// ArticleDetailHandler godoc
// @Summary Get article by ID
// @Description Get a single article with its comments
// @Tags articles
// @Accept json
// @Produce json
// @Param id path int true "Article ID"
// @Success 200 {object} models.Article
// @Router /article/{id} [get]
func (c *ArticleController) ArticleDetailHandler(w http.ResponseWriter, req *http.Request) {
	articleID, err := strconv.Atoi(mux.Vars(req)["id"])
	if err != nil {
		err = apperrors.BadParam.Wrap(err, "pathparam must be number")
		apperrors.ErrorHandler(w, req, err)
		return
	}

	article, err := c.service.GetArticleService(articleID)
	if err != nil {
		apperrors.ErrorHandler(w, req, err)
		return
	}

	json.NewEncoder(w).Encode(article)
}

// PostNiceHandler godoc
// @Summary Add a nice (like) to article
// @Description Increment the nice counter for an article
// @Tags articles
// @Accept json
// @Produce json
// @Param article body models.Article true "Article object with ID"
// @Success 200 {object} models.Article
// @Router /article/nice [post]
func (c *ArticleController) PostNiceHandler(w http.ResponseWriter, req *http.Request) {
	var reqArticle models.Article
	if err := json.NewDecoder(req.Body).Decode(&reqArticle); err != nil {
		apperrors.ErrorHandler(w, req, err)
		http.Error(w, "fail to decode json\n", http.StatusBadRequest)
	}

	article, err := c.service.PostNiceService(reqArticle)
	if err != nil {
		apperrors.ErrorHandler(w, req, err)
		return
	}

	json.NewEncoder(w).Encode(article)
}
