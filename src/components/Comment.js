import React, { Component } from 'react';
import axios from 'axios';
import { Collapsible, CollapsibleItem } from 'react-materialize';
import getSavedArticles from './getSavedArticles';
import { changeNoteState } from '../actions';
import { store } from '../store';

export default class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      commentIcons: {
        isVisible: true
      },
      editForm: {
        isVisible: false
      },
      commentText: {
        isVisible: true
      }
    }

    this.handleCommentView = this.handleCommentView.bind(this)
    this.handleIconsView = this.handleIconsView.bind(this)
    this.handleFormView = this.handleFormView.bind(this)
  }
  handleIconsView(bool) {
    this.setState({commentIcons: {isVisible: bool}})
  }
  handleFormView(bool) {
    this.setState({editForm: {isVisible: bool}})
  }
  handleCommentView(bool) {
    this.setState({commentText: {isVisible: bool}})
  }
  render() {
    if(this.props.article.comments) {
      return (
        <Collapsible className="z-depth-0">
          <CollapsibleItem header='View comment' id="comment-container" icon='message'>
            {this.state.commentText.isVisible && this.props.article.comments.comment : false}
            {this.state.commentIcons.isVisible && 
              <CommentIcons 
                article={this.props.article} 
                handleFormView={this.handleFormView}
                handleIconsView={this.handleIconsView}
                handleCommentView={this.handleCommentView}
              /> 
            }
            {this.state.editForm.isVisible &&
              <EditForm 
                article={this.props.article} 
                handleFormView={this.handleFormView}
                handleIconsView={this.handleIconsView}
                handleCommentView={this.handleCommentView}
              />
            }
          </CollapsibleItem>
        </Collapsible>
      )
    } else {
      return (
        <Collapsible className="z-depth-0">
          <CollapsibleItem header='Leave a comment' icon='mode_edit'>
            <form onSubmit = {(e) => {
                saveComment(e, this.props.article._id)
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
}

function saveComment(e, id) {
  e.preventDefault();
  const comment = e.target.comment.value
  axios.post(`/articles/${id}/comments`, { comment })
  .then(response => getSavedArticles())
  .catch(err => console.log(err));
}

function updateComment(e, id) {
  e.preventDefault();
  const comment = e.target.comment.value
  axios.put(`/articles/comments/${id}`, { comment })
  .then(response => getSavedArticles())
  .catch(err => console.log(err));
}

function handleChange(e, id) {
  store.dispatch(changeNoteState(e.target.value, id))
}

function EditForm(props) { 
  return (
    <form onSubmit = {(e) => {
        updateComment(e, props.article.comments._id)
        props.handleFormView(false)
        props.handleCommentView(true)
        props.handleIconsView(true)
      }}
    >  
    <textarea className="materialize-textarea"
      name="comment"
      value={props.article.comments.comment} 
      onChange={(e) => {
        handleChange(e, props.article._id)
      }}
    >
    </textarea>
    <button className='btn red lighten-3 comment-btn' type="submit">Add</button>
    </form>
  )
}

function CommentIcons(props) {
  return (
    <div className="comment-icons">
      <i className="material-icons" 
        onClick={(e) => {
          props.handleFormView(true)
          props.handleCommentView(false)
          props.handleIconsView(false)
        } 
        }
      >mode_edit</i>
      <i className="material-icons"
      onClick={(e) => {
        removeComment(props.article.comments._id)
      } 
      }
      >delete</i>
    </div>
  )
}

function removeComment(id) {
  axios.delete(`/comments/${id}`)
    .then(response => getSavedArticles())
    .catch(err => console.log(err));
}