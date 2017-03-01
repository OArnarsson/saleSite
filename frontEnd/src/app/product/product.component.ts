import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../apiServices/product.service';
import { Product } from '../classes/product';
import { Tab } from '../classes/tab';
import { throttleTime } from "rxjs/operator/throttleTime";
import * as _ from "lodash";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input () sellerId: any;
  public page = 1;
  public tabs: Tab[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    let def = new Tab('Products', []);
    let top10 = new Tab('Top 10', []);
    this.tabs = [];
    this.tabs.push(def);
    this.tabs.push(top10);
    this.productService.getProductsById(this.sellerId).subscribe(
        (products) => {
          this.tabs[0].products = products;
          this.tabs[1].products = this.getTop10();
        }
    )
  }

  getTop10(): Product[]{
    return _.take((_.sortBy(this.tabs[0].products, [function(o) { return o.quantitySold; }])).reverse(), 10);
  }

}
