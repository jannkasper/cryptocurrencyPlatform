import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ArticleCurrencyComponent } from './article-currency/article-currency.component';
import { CurrencyDetailComponent } from './article-currency/currency-detail/currency-detail.component';
import { CurrencyChartComponent } from './article-currency/currency-chart/currency-chart.component';
import {HttpClientModule} from '@angular/common/http';
import { CurrencyListComponent } from './article-currency/currency-list/currency-list.component';
import {NgApexchartsModule} from 'ng-apexcharts';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgMarqueeModule} from 'ng-marquee';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ArticleCurrencyComponent,
    CurrencyDetailComponent,
    CurrencyChartComponent,
    CurrencyListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    NgMarqueeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
