package api

import (
	"database/sql"
	"net/http"

	"github.com/gorilla/mux"
	httpSwagger "github.com/swaggo/http-swagger"
	"github.com/yourname/reponame/api/middlewares"
	"github.com/yourname/reponame/controllers"
	_ "github.com/yourname/reponame/docs"
	"github.com/yourname/reponame/services"
)

func NewRouter(db *sql.DB) *mux.Router {
	ser := services.NewMyAppService(db)
	aCon := controllers.NewArticleController(ser)
	cCon := controllers.NewCommentController(ser)
	authCon := controllers.NewAuthController()

	r := mux.NewRouter()

	// 認証エンドポイント（認証不要）
	r.HandleFunc("/auth/login", authCon.LoginHandler).Methods(http.MethodPost)
	r.HandleFunc("/auth/logout", authCon.LogoutHandler).Methods(http.MethodPost)

	r.HandleFunc("/hello", aCon.HelloHandler).Methods(http.MethodGet)

	r.HandleFunc("/article", aCon.PostArticleHandler).Methods(http.MethodPost)
	r.HandleFunc("/article/list", aCon.ArticleListHandler).Methods(http.MethodGet)
	r.HandleFunc("/article/{id:[0-9]+}", aCon.ArticleDetailHandler).Methods(http.MethodGet)
	r.HandleFunc("/article/nice", aCon.PostNiceHandler).Methods(http.MethodPost)

	r.HandleFunc("/comment", cCon.PostCommentHandler).Methods(http.MethodPost)

	// Swagger endpoint
	r.PathPrefix("/swagger/").Handler(httpSwagger.WrapHandler)

	r.Use(middlewares.LoggingMiddleware)
	r.Use(middlewares.AuthMiddleware)

	return r
}
