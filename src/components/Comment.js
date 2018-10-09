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
          <form onSubmit = {(e) => {
                saveComment(e, props.article._id)
              }}
          >  
            <textarea className="materialize-textarea" name="comment"></textarea>
            <button className='btn red lighten-3 comment-btn' type="submit">Add</button>
          </form>
        </CollapsibleItem>
      </Collapsible>
    )
  }
}

function saveComment(e, id) {
  e.preventDefault();
  const comment = e.target.comment.value
  console.log(id)
  axios.post(`/articles/${id}/comments`, { comment })
  .then(response => getSavedArticles())
  .catch(err => console.log(err));
}