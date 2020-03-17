import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { ArticleCurrencyComponent } from './article-currency/article-currency.component';
import { CurrencyDetailComponent } from './article-currency/currency-detail/currency-detail.component';
import { CurrencyChartComponent } from './article-currency/currency-chart/currency-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuListComponent,
    ArticleCurrencyComponent,
    CurrencyDetailComponent,
    CurrencyChartComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
