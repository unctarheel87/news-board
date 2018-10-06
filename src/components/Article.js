import React from 'react';

export default(props) => {
  return (
    <div>
      <img src={props.article.img} />
      <h5>{props.article.title}</h5>
      <p>{props.article.summary}</p>
    </div>
  );
}