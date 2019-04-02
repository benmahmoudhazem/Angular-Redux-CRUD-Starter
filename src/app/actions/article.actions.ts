import { Action } from '@ngrx/store';
import { Article } from '../models/article.model';

export const LOAD_ARTICLES              = '[ARTICLES] Load';
export const LOAD_ARTICLES_SUCCESS      = '[ARTICLES] Load Success';
export const LOAD_ARTICLES_FAILURE      = '[ARTICLES] Load Failure';

export const ADD_ARTICLE                = '[ARTICLE] Add';
export const ADD_ARTICLE_SUCCESS        = '[ARTICLE] Add Success';
export const ADD_ARTICLE_FAILURE        = '[ARTICLE] Add Failure';

export const REMOVE_ARTICLE             = '[ARTICLE] Remove';
export const REMOVE_ARTICLE_SUCCESS     = '[ARTICLE] Remove Success';
export const REMOVE_ARTICLE_FAILURE     = '[ARTICLE] Remove Failure';

export const UPDATE_ARTICLE             = '[ARTICLE] Update';
export const UPDATE_ARTICLE_SUCCESS     = '[ARTICLE] Update Success';
export const UPDATE_ARTICLE_FAILURE     = '[ARTICLE] Update Failure';

export class LoadArticles implements Action {
  readonly type = LOAD_ARTICLES;
}

export class LoadArticlesSuccess implements Action {
  readonly type = LOAD_ARTICLES_SUCCESS;

  constructor(public payload: Article[]) {}
}

export class LoadArticlesFailure implements Action {
  readonly type = LOAD_ARTICLES_FAILURE;
}

export class AddArticle implements Action {
  readonly type = ADD_ARTICLE;
  constructor(public payload: Article) {}
}

export class AddArticleSuccess implements Action {
  readonly type = ADD_ARTICLE_SUCCESS;
  constructor(public payload: Article) {}
}

export class AddArticleFailure implements Action {
  readonly type = ADD_ARTICLE_FAILURE;
}

export class RemoveArticle implements Action {
  readonly type = REMOVE_ARTICLE;

  constructor(public payload: number) {}
}

export class RemoveArticleSuccess implements Action {
  readonly type = REMOVE_ARTICLE_SUCCESS;

  constructor(public payload: number) {}
}

export class RemoveArticleFailure implements Action {
  readonly type = REMOVE_ARTICLE_FAILURE;
}

export class UpdateArticle implements Action {
  readonly type = UPDATE_ARTICLE;

  constructor(public payload: Article) {}
}

export class UpdateArticleSuccess implements Action {
  readonly type = UPDATE_ARTICLE_SUCCESS;

  constructor(public payload: Article) {}
}

export class UpdateArticleFailure implements Action {
  readonly type = UPDATE_ARTICLE_FAILURE;
}

export type Actions =
LoadArticles | LoadArticlesSuccess | LoadArticlesFailure |
AddArticle | AddArticleSuccess | AddArticleFailure |
RemoveArticle | RemoveArticleSuccess | RemoveArticleFailure |
UpdateArticle | UpdateArticleSuccess | UpdateArticleFailure;
