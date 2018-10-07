import { setSavedArticles } from '../actions';
import axios from 'axios';
import { store } from '../store';

export default() => {
  axios.get('/articles/saved')
    .then(response => {
      console.log('runs')
      store.dispatch(setSavedArticles(response.data))
      console.log(store.getState())
  })
  .catch(err => console.log(err));
}