import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SellerIface } from '../interfaces/seller-iface';
import 'rxjs/rx';


@Injectable()
export class SellerService {
  private baseUrl: string;

  constructor(private http: Http) {
    //this.baseUrl = 'http://localhost:5000/api/sellers/';
    this.baseUrl = 'http://192.168.1.10:5000/api/sellers/';
  }

  // Get All sellers
  getSellers(): Observable<SellerIface[]> {
    return this.http.get(`${this.baseUrl}`)
      .map(res => {
        return <SellerIface[]>res.json();
      });
  };

  // Get one Seller
  getSingleSeller(id: number): Observable<SellerIface> {
    return this.http.get(`${this.baseUrl}${id}`)
      .map(res => {
        return <SellerIface>res.json();
      });
  };

  // Post single Seller
  postSingleSeller(seller: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, seller)
      .map(res => {
        return <SellerIface>res.json();
      });
  };

  // Edit single Seller
  putSingleSeller(seller: any): Observable<SellerIface> {
    return this.http.put(`${this.baseUrl}${seller.id}`, seller)
      .map(res => {
        return <SellerIface>res.json();
      });
  };

}
