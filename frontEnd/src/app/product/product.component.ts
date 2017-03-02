import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../apiServices/product.service';
import { Product } from '../classes/product';
import { DialogComponent } from '../dialog/dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Tab } from '../classes/tab';
import { throttleTime } from 'rxjs/operator/throttleTime';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import * as _ from 'lodash';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() sellerId: any;
  public page = 1;
  public tabs: Tab[];
  private errorHandler: any;
  private successHandler: any;

  constructor(private modalService: NgbModal, private productService: ProductService, private toastyService: ToastyService, private toastyConfig: ToastyConfig) { }

  ngOnInit() {
    let def = new Tab('Products', []);
    let top10 = new Tab('Top 10', []);
    this.tabs = [];
    this.tabs.push(def);
    this.tabs.push(top10);
    this.configHandler();
    this.productService.getProductsById(this.sellerId).subscribe(
      (products) => {
        this.tabs[0].products = products;
        this.tabs[1].products = this.getTop10();
      },
      this.errorHandler);
  }

  editProduct(product: Product) {
    this.popModal('Edit product', 'Save', product, 'PUT');
  }

  newProduct() {
    this.popModal('Create a new product', 'Create', new Product(this.sellerId, 9, '', 0, 0, 0, ''), 'POST');
  }

  updateProductList(newProduct: Product) {
    let obj = _.findIndex(this.tabs[0].products, product => {
      return product.id === newProduct.product.id;
    });
    console.log(obj);
    console.log(this.tabs[0].products[obj], newProduct);

    if (obj > -1) {
      this.tabs[0].products[obj] = newProduct.product;
    } else {
      this.tabs[0].products.push(newProduct.product);
    }
  }

  popModal(title: string, okBut: string, product: Product, rest: string) {
    const newProduct = product;
    const modal = this.modalService.open(DialogComponent);
    modal.componentInstance.title = title;
    modal.componentInstance.onOkButton = okBut;
    modal.componentInstance.product = JSON.parse(JSON.stringify(newProduct));
    modal.result.then(obj => {
      this.addProductToDb(obj, rest);
    }).catch(err => {
      console.log(err);
    });
  }

  configHandler() {
    this.successHandler = (data) => {
      this.updateProductList(data);
      this.addToast('Mission Complete!', `${data.name} has been saved`, 'success');
    };
    this.errorHandler = (err) => {
      let msg = '';
      if (err.status == 404) {
        msg = 'Damn.. Lost again!';
      } else {
        msg = 'Server fucked us..';
      }
      if (err.status == 0) {
        msg = 'Node server offline';
      }
      this.addToast(`Mission Failed ERROR ${err.status}`, msg, 'error');
    };
  }

  addProductToDb(product: Product, rest: string) {
    if (rest === 'PUT') {
      this.productService.putSingleProduct(this.sellerId, product).subscribe(this.successHandler, this.errorHandler);
    }
    if (rest === 'POST') {
      this.productService.postSingleProduct(product).subscribe(this.successHandler, this.errorHandler);
    };
  }

  getTop10(): Product[] {
    return _.take((_.sortBy(this.tabs[0].products, [function (o) { return o.quantitySold; }])).reverse(), 10);
  }

  // Toaster msg
  addToast(title: string, msg: string, code: string) {
    const toastOptions: ToastOptions = {
      title: title,
      msg: msg,
      showClose: true,
      timeout: 5000,
      theme: 'material',
      onAdd: (toast: ToastData) => { },
      onRemove: function (toast: ToastData) { }
    };
    if (code === 'success') {
      this.toastyService.success(toastOptions);
    } else {
      this.toastyService.error(toastOptions);
    }
  }

}
