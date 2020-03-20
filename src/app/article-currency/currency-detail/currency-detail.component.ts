import {Component, Input, OnInit} from '@angular/core';
import {CoinDetailModel} from '../../coin-detail.model';

@Component({
  selector: 'app-currency-detail',
  templateUrl: './currency-detail.component.html',
  styleUrls: ['./currency-detail.component.css']
})
export class CurrencyDetailComponent implements OnInit {
  @Input() coinDetail: CoinDetailModel[];
  constructor() { }

  ngOnInit(): void {
  }

}
