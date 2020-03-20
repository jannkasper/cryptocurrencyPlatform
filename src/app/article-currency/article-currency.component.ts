import { Component, OnInit } from '@angular/core';
import {CoinsService} from '../coins.service';
import {CoinChartModel, CoinDetailModel} from '../coin-detail.model';
import {from, Observable, Observer, Subscription} from 'rxjs';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-article-currency',
  templateUrl: './article-currency.component.html',
  styleUrls: ['./article-currency.component.css']
})
export class ArticleCurrencyComponent implements OnInit {
  currentCoinId = 'bitcoin';
  vsCurrency = 'usd';
  fromTimestamp = 1392577232;
  toTimestamp = 1422577232;
  public coinList: CoinDetailModel[];
  public coin: CoinDetailModel;
  public coinChart: CoinChartModel;
  error = null;
  dataY: number[] = [];
  dataX: string[] = [];

  constructor(private coinsService: CoinsService) { }

  setSelectedCoin(vsCurrency: string, currentCoinId: string){
    this.vsCurrency = vsCurrency;
    this.currentCoinId = currentCoinId;
  }

  setPeriod(fromTimestamp: number, toTimestamp: number){
    const fromDate = Date.now() - 86400000;
    const toDate = Date.now();
    this.fromTimestamp = fromTimestamp;
    this.toTimestamp = toTimestamp;
  }

  ngOnInit(): void {
    this.setSelectedCoin('usd', 'bitcoin');
    const fromDate = new Date("2020/03/19 04:00:00").getTime()/1000;
    const toDate = new Date("2020/03/20 05:00:00").getTime()/1000;
    this.setPeriod(fromDate, toDate); // that is: 24 * 60 * 60 * 1000
    (async () => {
      // Do something before delay
      // this.readList();
      // this.readCoin();
      this.readChart();
      // await this.delay(1000);
      // Do something after
      // console.log('after delay');
      // console.log(this.coinList);
      // console.log(this.coin);
      // console.log(this.coinChart);
    })();
  }

  readCoin() {
    this.coinsService.getCoinRequest(this.vsCurrency, this.currentCoinId)
      .subscribe(coinData => {
        this.coin = coinData});
  }

  readChart() {
    this.coinsService.getCoinMarketChartRequest(this.vsCurrency, this.currentCoinId, this.fromTimestamp, this.toTimestamp)
      .subscribe(coinChartData => {
        console.log(coinChartData);
        for (var price of coinChartData.prices) {
          this.dataX.push(new Date(price[0]).toLocaleString());
          this.dataY.push(price[1]);
        }
        this.coinChart = coinChartData});
  }

  readList(){
    this.coinsService.getCoinsRequest(this.vsCurrency, 'market_cap_desc', 10, 1,false)
      .subscribe(listData => {
        this.coinList = listData});
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  time = new Observable<string>((observer: Observer<string>) => {
    setInterval(() => {
      console.log('HERE');
      observer.next(new Date().toString())
    }, 1000);
  });
}
