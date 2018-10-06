export default (state, action) => {
  switch (action.type) {
    case "GET_ARTICLES":
      return {
        ...state,
        articles: action.articles
      };
      case "CLEAR_ARTICLES":
      return {
        ...state,
        articles: []
      };
    default:
      return state;
  }
};