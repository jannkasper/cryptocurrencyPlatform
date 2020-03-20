import {Component, Input, OnInit} from '@angular/core';
import {CoinDetailModel} from '../../coin-detail.model';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent implements OnInit {
  @Input() coinList: CoinDetailModel[];
  constructor() { }

  ngOnInit(): void {
  }

}
