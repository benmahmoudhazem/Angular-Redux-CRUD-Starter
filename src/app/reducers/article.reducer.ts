import { Action } from '@ngrx/store';
import { Article } from '../models/article.model';

import * as ArticleActions from './../actions/article.actions';

const initialState: Array<Article> = [];

export function reducer(state: Article[] = initialState, action: ArticleActions.Actions) {

  // Section 3
  switch (action.type) {
      case ArticleActions.LOAD_ARTICLES_SUCCESS:
        return action.payload;
      case ArticleActions.ADD_ARTICLE_SUCCESS:
        const newArray = state.slice();
        const addIndex = state.findIndex(article => article.id === action.payload.id);
        newArray.splice(addIndex, 0, action.payload);
        return newArray;
      case ArticleActions.REMOVE_ARTICLE_SUCCESS:
        console.log('Reducer delete -> ', action.payload);
        const index = state.findIndex(article => article.id === action.payload);

        return [...state.slice(0, index), ...state.slice(index + 1)];
      case ArticleActions.UPDATE_ARTICLE_SUCCESS:
        const updatedItems = state.map(item => {
          if (item.id === action.payload.id) {
            return { ...item, ...action.payload };
          }
          return item;
        });
        return updatedItems;
      default:
        return state;
  }
}
