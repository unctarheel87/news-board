export default (state, action) => {
  switch (action.type) {
    case "GET_ARTICLES":
      return {
        ...state,
        articles: action.articles
      };

    default:
      return state;
  }
};