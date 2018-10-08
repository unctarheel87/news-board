export default (state, action) => {
  switch (action.type) {
    case "SET_ARTICLES":
      return {
        ...state,
        articles: action.articles.filter((article, i) => {
          return state.savedArticles.every(savedArticle => {
            return article.title !== savedArticle.title
          })
        })
      };
    case "CLEAR_ARTICLES":
      return {
        ...state,
        articles: []
      };
    case "SET_SAVED_ARTICLES":
      return {
        ...state,
        savedArticles: action.articles,
        articles: state.articles.filter((article, i) => {
          return action.articles.every(savedArticle => {
            return article.title !== savedArticle.title
          })
        })
      };
    default:
      return state;
  }
};