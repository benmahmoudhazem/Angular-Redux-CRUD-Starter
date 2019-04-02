import { Component, ViewChild, OnInit } from '@angular/core';
import { AgGridNg2 } from 'ag-grid-angular';
import { Observable } from 'rxjs';
import { map, reduce } from 'rxjs/operators';
import { Article } from './models/article.model';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import * as ArticleActions from './actions/article.actions';
import { ArticleService } from './services/article.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  appName = 'Angular Redux CRUD Starter';
  @ViewChild('agGrid') agGrid: AgGridNg2;

  private gridApi;
  private gridColumnApi;
  private columnDefs;
  private rowData: Array<any>;
  private defaultColDef;

  articles: Observable<Article[]>;

  maxId: number;
  title: string;
  author: string;

  constructor(private store: Store<AppState>, private articleService: ArticleService) {
    this.articles = store.select('articles');

    this.columnDefs = [
      {headerName: 'Title', field: 'title', filter: true, checkboxSelection: true },
      {headerName: 'Author', field: 'author', filter: true},
      {headerName: 'Created At', field: 'createdAt', sortable: true},
    ];

    this.defaultColDef = {
      editable: true,
      resizable: true
    };

  }

  ngOnInit() {
    // this.store.dispatch(new ArticleActions.AddArticle({id: 1, title: 'Redux1', author: 'Jhon1', createdAt: '2019-01-25 23:00'}));
    // this.store.dispatch(new ArticleActions.AddArticle({id: 2, title: 'Redux2', author: 'Jhon2', createdAt: '2019-01-25 23:00'}));
    // this.store.dispatch(new ArticleActions.AddArticle({id: 3, title: 'Redux3', author: 'Jhon3', createdAt: '2019-01-25 23:00'}));

    /* this.articleService.getArticles().subscribe(articles => {
      this.store.dispatch(new ArticleActions.LoadArticle(articles));
    }); */
    this.store.dispatch(new ArticleActions.LoadArticles());
  }

  addRows() {
    const article: Article = {
      id: this.maxId + 1,
      title: this.title,
      author: this.author,
      createdAt: (new Date()).toISOString()
    };

    this.store.dispatch(new ArticleActions.AddArticle(article));

    this.title = '';
    this.author = '';
  }

  deleteSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    for (const node of selectedNodes) {
      const id = node.data.id;
      this.store.dispatch(new ArticleActions.RemoveArticle(id));
    }

  }


  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();

    this.articles.subscribe(articles => {
      const ids: Array<number> = articles.map(article => article.id);
      this.maxId = Math.max(...ids);
      this.gridApi.setRowData(articles.sort((a, b) => a.id - b.id ));
      this.gridApi.refreshCells();
      this.gridApi.redrawRows();
    });
  }

  onRowValueChanged(event) {
    const updatedArticle: Article = event.data;
    this.store.dispatch(new ArticleActions.UpdateArticle(updatedArticle));
  }

}
