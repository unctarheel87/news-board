import React from 'react';
import axios from 'axios';
 
export default(props) => {
  const saveArticle = (e) => {
    const title = props.article.title
    const summary = props.article.summary
    const image = props.article.img
    const article = { title, summary, image}
    
    axios.post('/save', article)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  }
  return (
    <div>
      <img src={props.article.img} />
      <h5>{props.article.title}</h5>
      <p>{props.article.summary}</p>
      <button className="btn" onClick={saveArticle}>Save Article</button>
    </div>
  );
}