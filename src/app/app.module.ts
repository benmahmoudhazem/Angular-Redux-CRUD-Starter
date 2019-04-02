import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers/article.reducer';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { ArticleService } from './services/article.services';
import { EffectsModule } from '@ngrx/effects';
import { ArticleEffects } from './effects/article.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      articles: reducer
    }),
    AgGridModule.withComponents([]),
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    EffectsModule.forRoot([ArticleEffects])
  ],
  providers: [InMemoryDataService, ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
