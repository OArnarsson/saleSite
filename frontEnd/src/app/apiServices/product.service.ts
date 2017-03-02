import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ProductIface } from '../interfaces/product-iface';
import 'rxjs/rx';


@Injectable()
export class ProductService {
  private baseUrl: string;

  constructor(private http: Http) {
    this.baseUrl = 'http://localhost:5000/api/sellers/';
  }

  // Get list of products by a given seller:
  getProductsById(id: number): Observable<ProductIface[]> {
    return this.http.get(`${this.baseUrl}${id}/products`)
      .map(res => {
        return <ProductIface[]>res.json();
      })
  };

  // Edit single Product
  postSingleProduct(product: any): Observable<ProductIface> {
    return this.http.post(`${this.baseUrl}${product.id}/products`, product)
      .map(res => {
        return <ProductIface>res.json();
      })
  };

  // Edit single Product
  putSingleProduct(sID: any, product: any): Observable<ProductIface> {
    return this.http.put(`${this.baseUrl}${sID}/products/${product.id}`, product)
      .map(res => {
        return <ProductIface>res.json();
      })
  };
}
