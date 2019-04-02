import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Article } from './models/article.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  constructor() { }

  createDb() {
    const articles = [
      {id: 1, title: 'Redux1', author: 'Jhon1', createdAt: (new Date()).toISOString()},
      {id: 2, title: 'Redux2', author: 'Jhon2', createdAt: (new Date()).toISOString()},
      {id: 3, title: 'Redux3', author: 'Jhon3', createdAt: (new Date()).toISOString()}
    ];
    return {articles};
  }

  /* genId(articles: Article[]): number {
    return articles.length > 0 ? Math.max(...articles.map(article => article.id)) + 1 : 1;
  } */
}
