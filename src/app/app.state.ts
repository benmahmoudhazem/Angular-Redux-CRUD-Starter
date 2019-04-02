import { Article } from './models/article.model';

export interface AppState {
  readonly articles: Article[];
}
