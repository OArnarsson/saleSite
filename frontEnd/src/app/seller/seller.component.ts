import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from '../dialog/dialog.component';
import { Seller } from '../classes/seller';
import { SellerService } from '../apiServices/seller.service';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import * as _ from "lodash";

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent implements OnInit {
  private errorHandler: any;
  private successHandler: any;

  public Sellers: Seller[];

  constructor(private modalService: NgbModal, private sellerService: SellerService, private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
  }

  ngOnInit() {
    this.Sellers = []; // Construct the arr. in case of failure we wont get an error in the view.
    this.configHandler();
    this.sellerService.getSellers().subscribe(
      (data) => {
        this.Sellers = data;
      },
      this.errorHandler);
  }

  newSeller() {
    this.popModal('Create a new seller', 'Create', new Seller(0, '', '', ''), 'POST');
  }

  editSeller(seller: Seller) {
    this.popModal('Edit seller', 'Save', seller, 'PUT');
  }

  popModal(title: string, okBut: string, seller: Seller, rest: string) {
    const modal = this.modalService.open(DialogComponent);
    modal.componentInstance.title = title;
    modal.componentInstance.onOkButton = okBut;
    modal.componentInstance.seller = JSON.parse(JSON.stringify(seller));
    modal.result.then(obj => {
      this.addSellerToDb(obj, rest);
    }).catch(err => {
      console.log(err);
    })
  }

  configHandler() {
    this.successHandler = (data) => {
      this.updateUserList(data);
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

  addSellerToDb(seller: Seller, rest: string) {
    if (rest === 'POST') {
      this.sellerService.postSingleSeller(seller).subscribe(this.successHandler, this.errorHandler)
    };
    if (rest === 'PUT') {
      this.sellerService.putSingleSeller(seller).subscribe(this.successHandler, this.errorHandler);
    }
  }

  updateUserList(newSeller: Seller) {
    let obj = _.findIndex(this.Sellers, seller => {
      return seller.id === newSeller.id
    });
    if (obj > -1) {
      this.Sellers[obj] = newSeller;
    } else {
      this.Sellers.push(newSeller);
    }
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
