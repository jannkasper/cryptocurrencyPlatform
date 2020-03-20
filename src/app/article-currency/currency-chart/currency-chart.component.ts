import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CoinChartModel, CoinDetailModel} from '../../coin-detail.model';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle, ApexFill, ApexStroke
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  stroke: ApexStroke;
};

@Component({
  selector: 'app-currency-chart',
  templateUrl: './currency-chart.component.html',
  styleUrls: ['./currency-chart.component.css']
})
export class CurrencyChartComponent implements OnInit {
  @Input() coinChart: CoinChartModel;
  @ViewChild("chart") chart: ChartComponent;
  @Input() dataY: number[] = [];
  @Input() dataX: string[] = [];
  public chartOptions: Partial<ChartOptions>;


  constructor() { }

  ngOnInit(): void {
    (async () => {
      await this.delay(1000);
      this.chartOptions = {
        series: [
          {
            name: "Price",
            data: this.dataY
          }
        ],
          chart: {
          height: 600,
            type: "line"
        },
        title: {
          text: "My First Angular Chart"
        },
        xaxis: {
          categories: this.dataX
        },
        fill: {
          colors: ['#493ab1', '#b82eb8']
        },
        stroke: {
          curve: 'smooth'
        }
      };

    })();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
