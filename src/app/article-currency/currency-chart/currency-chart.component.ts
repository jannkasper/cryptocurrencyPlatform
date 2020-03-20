import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CoinChartModel, CoinDetailModel} from '../../coin-detail.model';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle, ApexFill, ApexStroke,
  ApexDataLabels,
  ApexTooltip, ApexYAxis,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
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
          // ,{
          //   name: "series2",
          //   data: this.dataY.map(value => {return value = value - 500})
          // }
        ],
          chart: {
          height: 600,
            type: "area"
        },
        dataLabels: {
          enabled: false
        },
        title: {
          text: "My First Angular Chart"
        },
        xaxis: {
          categories: this.dataX
        },
        yaxis: {
          floating: true,
          tickAmount: 5,
          labels: {
            offsetX:200,
            formatter: (value) => { return Math.round(value).toString()},
            style: {
              colors: '#493ab1',
              fontSize: '12px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
              cssClass: 'apexcharts-yaxis-label',
            }
          },
        },
        fill: {
          colors: ['#493ab1', '#b82eb8']
        },
        stroke: {
          curve: 'smooth'
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm"
          },
        }
      };

    })();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
