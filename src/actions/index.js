export function setArticles (articles) {
  return {
    type: "SET_ARTICLES",
    articles
  }
}

export function setSavedArticles (articles) {
  return {
    type: "SET_SAVED_ARTICLES",
    articles
  }
}

export function clearArticles () {
  return {
    type: "CLEAR_ARTICLES"
  }
}