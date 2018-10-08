import React from 'react';
import axios from 'axios';
import Comment from './Comment';
import getSavedArticles from './getSavedArticles';
 
export default(props) => {
  return (
    <div>
      <img src={props.article.image} />
      <h5>{props.article.title}</h5>
      <p>{props.article.summary}</p>
      <Comment article={props.article} />
      <button className='btn red lighten-3 delete-btn' 
              onClick={(e) => { removeArticle(props.article._id) }}
      >
      x</button>
    </div>
  );
}

function removeArticle(id) {
  axios.delete(`/articles/saved/${id}`)
    .then(response => getSavedArticles())
    .catch(err => console.log(err));
}