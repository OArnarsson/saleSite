import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import { SellerIface } from '../interfaces/seller-iface'
import 'rxjs/rx';


@Injectable()
export class SellerService {
  private baseUrl: string;

  constructor(private http: Http) {
    this.baseUrl = 'http://localhost:5000';
  }

  //Get All sellers
  getSellers(): Observable<SellerIface[]> {
    return this.http.get(`${this.baseUrl}/api/sellers`)
        .map(res => {
          return <SellerIface[]> res.json();
        })
  };



}
