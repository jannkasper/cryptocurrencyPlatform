import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CoinsService} from '../coins.service';
import {CoinChartModel, CoinDetailModel, CoinName} from '../coin-detail.model';
import {from, Observable, Observer, Subscription} from 'rxjs'
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill, ApexGrid, ApexMarkers,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis
} from 'ng-apexcharts';
import * as moment from 'moment';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  grid: ApexGrid;
  markers: ApexMarkers;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

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
  public allList: CoinName[];
  public coin: CoinDetailModel;
  public bitcoin: CoinDetailModel;
  public coinChart: CoinChartModel;
  public searchResult: CoinName[];
  error = null;
  dataY: number[] = [];
  dataX: string[] = [];
  codeValue: string;

  public chartOptions: Partial<ChartOptions>;

  constructor(private coinsService: CoinsService) { }

  updateCoin(){
    if (this.currentCoinId == this.codeValue) return;
    if (this.allList.find(el => el.id == this.codeValue) == null) return;
    this.currentCoinId = this.codeValue;
    this.codeValue = "";
    this.searchResult = [];
    this.readCoin();
    this.updateChart();

  }

  selectedCoin(id: string){
    if (this.currentCoinId == id) return;
    this.currentCoinId = id;
    this.readCoin();
    this.updateChart();

  }

  search(e): void {
    let term = e.target.value;
    this.searchResult = [];
    if (term.length < 1) return;
    for (let element of this.allList) {
      if (element.id.toLowerCase().startsWith(term.toLowerCase())
        || element.name.toLowerCase().startsWith(term.toLowerCase())) {
        this.searchResult.push(element);
      }
    }
  }

  setSelectedCoin(vsCurrency: string, currentCoinId: string){
    this.vsCurrency = vsCurrency;
    this.currentCoinId = currentCoinId;
  }

  setPeriod(fromTimestamp: number, toTimestamp: number) {
    // const fromDate = Date.now() - 86400000;
    // const toDate = Date.now();
    this.fromTimestamp = fromTimestamp;
    this.toTimestamp = toTimestamp;
  }

  readCoin() {
    this.coinsService.getCoinRequest(this.vsCurrency, this.currentCoinId)
      .subscribe(coinData => {
        this.coin = coinData});
  }

  readChart() {
    this.dataX = [];
    this.dataY = [];
    this.coinsService.getCoinMarketChartRequest(this.vsCurrency, this.currentCoinId, this.fromTimestamp, this.toTimestamp)
      .subscribe(coinChartData => {
        console.log(coinChartData);
        for (var price of coinChartData.prices) {
          // moment(price[0]).format('l');
          this.dataX.push(moment(price[0]).format('l'));
          this.dataY.push(price[1]);
        }
        this.coinChart = coinChartData});
  }

  readList(){
    this.coinsService.getCoinsRequest(this.vsCurrency, 'market_cap_desc', 20, 1,false)
      .subscribe(listData => {
        this.coinList = listData});
  }

  readAll(){
    this.coinsService.getAllRequest()
      .subscribe(listData => {
        this.allList = listData});
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


  ngOnInit(): void {
    this.coinsService.getCoinRequest(this.vsCurrency, 'bitcoin')
      .subscribe(bitcoinData => {
        this.bitcoin = bitcoinData});
    this.setSelectedCoin('usd', 'bitcoin');
    this.readCoin();
    this.readList();
    this.readAll();
    const fromDate = new Date("2020/03/14 12:00:00").getTime()/1000;
    const toDate = new Date("2020/03/21 12:00:00").getTime()/1000;
    this.setPeriod(fromDate, toDate); // that is: 24 * 60 * 60 * 1000
    this.updateChart();

  }

  updateChart() {
    (async () => {
      // Do something before delay
      this.readChart();
      while (this.dataY.length == 0)
      await this.delay(100);
      this.chartOptions = {
        series: [
          {
            name: "Price",
            data: this.dataY
          }
          // ,{
          //   name: "series2",
          //   data: this.dataY.map(value => {return value = value - 500})
          // }
        ],
        chart: {
          height: 600,
          type: "line"
        },
        dataLabels: {
          enabled: false
        },
        title: {
          text: ""
        },
        xaxis: {
          categories: this.dataX,
          labels: {
            rotate: 0,
            hideOverlappingLabels: true,
            showDuplicates: false,
            datetimeUTC: true,
            style: {
              colors: '#a5a7ad',
              fontSize: '14px',
              fontFamily: 'Lato, Helvetica, Arial, sans-serif',
              fontWeight: 700,
              cssClass: 'apexcharts-xaxis-label',
            },
          },
        },
        yaxis: {
          floating: true,
          tickAmount: 4,
          labels: {
            offsetX:200,
            offsetY:-10,
            formatter: (value) => { return '$' + Math.round(value).toString()},
            style: {
              colors: '#a5a7ad',
              fontSize: '14px',
              fontFamily: 'Lato, Helvetica, Arial, sans-serif',
              fontWeight: 650,
              cssClass: 'apexcharts-yaxis-label',
            }
          },
        },
        grid: {
          show: true,
          borderColor: 'rgba(144,164,174,0.15)',
          strokeDashArray: 0,
          position: 'back',
          xaxis: {
            lines: {
              show: false
            }
          },
          yaxis: {
            lines: {
              show: true,
            }
          },
          row: {
            colors: undefined,
            opacity: 0.5
          },
          column: {
            colors: undefined,
            opacity: 0.5
          },
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            gradientToColors: ['#b82eb8'],
            inverseColors: false,
            shadeIntensity: 1,
            type: "horizontal",
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
          }
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm"
          },
        }
      };
      // console.log(this.coinChart);


    })();

  }
}
