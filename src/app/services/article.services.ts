import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Article } from '../models/article.model';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ArticleService {

    constructor(private http: HttpClient) {}

    getArticles() {
        return this.http.get<Article[]>('/api/articles');
    }

    getArticle(id: number) {
      return this.http.get<Article>('/api/articles/' + id);
    }

    addArticle(article: Article) {
      return this.http.post<Article>('/api/articles', article, httpOptions);
    }

    updateArticle(article: Article) {
      console.log('updated -> ', article);
      return this.http.put<Article>('/api/articles/' + article.id, article, httpOptions).pipe(
        map(x =>  article)
      );
    }

    deleteArticle(id: number) {
      console.log('Delete -> ' + id);
      return this.http.delete('/api/articles/' + id, httpOptions).pipe(
        map(x =>  id)
      );
    }
}
