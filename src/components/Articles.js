import React from 'react';
import Article from './Article';

export default(props) => {
  return (
    <div className="articles">
    {
      props.store.map(article => {
        return <Article key={article.id} article={article} />
      })
    }
    </div>
  );
}