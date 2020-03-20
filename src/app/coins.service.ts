import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {CoinChartModel, CoinDetailModel} from './coin-detail.model';
import {Subject, throwError} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CoinsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  getCoinsRequest(vs_currency: string, order: string, perPage: number, page: number, sparkline: boolean) {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('vs_currency', vs_currency);
    searchParams = searchParams.append('order', order);
    searchParams = searchParams.append('per_page', perPage.toString());
    searchParams = searchParams.append('page', page.toString());
    searchParams = searchParams.append('sparkline', String(sparkline));
    return this.http.get<CoinDetailModel[]>('https://api.coingecko.com/api/v3/coins/markets', {
      params: searchParams,
      responseType: 'json'
    }).pipe(
      map(responseData => {
        // const coinsData = Object.keys(responseData).map(key => responseData[key]);
        return responseData as CoinDetailModel[];
      }),
      catchError( errorRes => {
        return throwError(errorRes);
      })
      );
  }

  getCoinRequest(vs_currency: string, ids: string) {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('vs_currency', vs_currency);
    searchParams = searchParams.append('ids', ids);
    searchParams = searchParams.append('order', 'market_cap_desc');
    searchParams = searchParams.append('per_page', '1');
    searchParams = searchParams.append('page', '1');
    searchParams = searchParams.append('sparkline', 'false');
    return this.http.get<{[key: string]: CoinDetailModel}>('https://api.coingecko.com/api/v3/coins/markets', {
      params: searchParams,
      responseType: 'json'
    }).pipe(
      map(responseData => {
        const coinsData = Object.keys(responseData).map(key => responseData[key]);
        return coinsData[0];
      }),
      catchError( errorRes => {
        return throwError(errorRes);
      })
    );
  }

  getCoinMarketChartRequest(vs_currency: string, ids: string, fromTimestamp: number, toTimestamp: number) {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('vs_currency', vs_currency);
    searchParams = searchParams.append('from', fromTimestamp.toString());
    searchParams = searchParams.append('to', toTimestamp.toString());
    return this.http.get<CoinChartModel>('https://api.coingecko.com/api/v3/coins/' + ids + '/market_chart/range', {
      params: searchParams,
      responseType: 'json'
    }).pipe(
      map(responseData => {
        return responseData as CoinChartModel;
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }
}
