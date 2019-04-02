import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, EMPTY, merge } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ArticleService } from '../services/article.services';
import * as ArticleActions from '../actions/article.actions';

@Injectable()
export class ArticleEffects {

  @Effect()
  loadArticles$ = this.actions$.pipe(
    ofType(ArticleActions.LOAD_ARTICLES),
    mergeMap(() => this.articleService.getArticles().pipe(
      map(articles => new ArticleActions.LoadArticlesSuccess(articles)),
      catchError(() => of(ArticleActions.LoadArticlesFailure))
    ))
  );

  @Effect()
  addArticle$ = this.actions$.pipe(
    ofType<ArticleActions.AddArticle>(ArticleActions.ADD_ARTICLE),
    map(action => action.payload),
    mergeMap(article => this.articleService.addArticle(article).pipe(
      map(res => new ArticleActions.AddArticleSuccess(res)),
      catchError(() => of(ArticleActions.AddArticleFailure))
    ))
  );

  @Effect()
  removeArticle$ = this.actions$.pipe(
    ofType<ArticleActions.RemoveArticle>(ArticleActions.REMOVE_ARTICLE),
    map(action => action.payload),
    mergeMap(id => this.articleService.deleteArticle(id).pipe(
      map(res =>  { console.log('effect -> ', res); return new ArticleActions.RemoveArticleSuccess(res); } ),
      catchError(() => of(ArticleActions.RemoveArticleFailure))
    ))
  );

  @Effect()
  updateArticle$ = this.actions$.pipe(
    ofType<ArticleActions.UpdateArticle>(ArticleActions.UPDATE_ARTICLE),
    map(action => action.payload),
    mergeMap(article => this.articleService.updateArticle(article).pipe(
      map(res => new ArticleActions.UpdateArticleSuccess(res)),
      catchError(() => of(ArticleActions.UpdateArticleFailure))
    ))
  );

  constructor(
    private actions$: Actions,
    private articleService: ArticleService
  ) {}
}
