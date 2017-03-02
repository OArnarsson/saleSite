import { Component, OnInit } from '@angular/core';
import { Product } from '../classes/product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from '../dialog/dialog.component';
import { ProductService } from '../apiServices/product.service';
import { SellerService } from '../apiServices/seller.service';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { Seller } from '../classes/seller';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seller-details',
  templateUrl: './seller-details.component.html',
  styleUrls: ['./seller-details.component.scss']
})
export class SellerDetailsComponent implements OnInit {
  public sellerId: number;
  public page = 1;
  public seller: Seller;
  private errorHandler: any;
  private successHandler: any;

  constructor(private modalService: NgbModal, private productService: ProductService, private sellerService: SellerService, private router: ActivatedRoute, private toastyService: ToastyService, private toastyConfig: ToastyConfig) { }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      this.sellerId = +params['id'];
      this.getInitData(this.sellerId);
    });
  }

  getInitData(sellerId: number) {
    this.sellerService.getSingleSeller(sellerId).subscribe(
      (seller) => {
        this.seller = seller;
      }
    );
  }

  newProduct() {
    this.popModal('Create a new product', 'Create', new Product(this.sellerId, 9, '', 0, 0, 0, ''), 'POST');
  }

  popModal(title: string, okBut: string, product: Product, rest: string) {
    const newProduct = product;
    const modal = this.modalService.open(DialogComponent);
    modal.componentInstance.title = title;
    modal.componentInstance.onOkButton = okBut;
    modal.componentInstance.product = newProduct;
    modal.result.then(obj => {
      this.addProductToDb(obj, rest);
    }).catch(err => {
      console.log(err);
    })
  }

  configHandler() {
    this.successHandler = (data) => {
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
    if (rest === 'POST') {
      this.productService.postSingleProduct(product).subscribe(this.successHandler, this.errorHandler)
    };
  }

  //Toaster msg
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
