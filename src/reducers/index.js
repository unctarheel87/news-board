export default (state, action) => {
  switch (action.type) {
    case "SET_ARTICLES":
      return {
        ...state,
        articles: action.articles.filter((article, i) => {
          for (let savedArticle of state.savedArticles) {
            return article.title !== savedArticle.title
          }
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
        savedArticles: action.articles
      };
    default:
      return state;
  }
};