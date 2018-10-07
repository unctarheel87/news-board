import React from 'react';
import { Collapsible, CollapsibleItem } from 'react-materialize';
 
export default(props) => {
  return (
    <div>
      <img src={props.article.image} />
      <h5>{props.article.title}</h5>
      <p>{props.article.summary}</p>
      <Collapsible className="z-depth-0">
        <CollapsibleItem header='Leave a comment' icon='message'>
          <form>
            <textarea className="materialize-textarea"></textarea>
          </form>
        </CollapsibleItem>
      </Collapsible>
    </div>
  );
}