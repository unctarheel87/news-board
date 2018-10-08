import React from 'react';
import axios from 'axios';
import { Collapsible, CollapsibleItem } from 'react-materialize';
import getSavedArticles from './getSavedArticles';

export default (props) => {
  if(props.article.comments) {
    return (
      <Collapsible className="z-depth-0">
        <CollapsibleItem header='View comment' icon='message'>
          {props.article.comments.comment}
        </CollapsibleItem>
      </Collapsible>
    )
  } else {
    return (
      <Collapsible className="z-depth-0">
        <CollapsibleItem header='Leave a comment' icon='mode_edit'>
          <form onSubmit={saveComment}>
            <textarea className="materialize-textarea" name="comment"></textarea>
            <button className='btn red lighten-3 comment-btn' type="submit">Add</button>
          </form>
        </CollapsibleItem>
      </Collapsible>
    )
  }
}

function saveComment(e) {
  e.preventDefault();
  const comment = e.target.comment.value
  axios.post(`/articles/comments`, { comment })
  .then(response => getSavedArticles())
  .catch(err => console.log(err));
}