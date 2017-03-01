import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from '../dialog/dialog.component';
import { Seller } from '../classes/seller';
import { SellerService } from '../apiServices/seller.service';
import * as _ from "lodash";

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent implements OnInit {

  closeResult: string;
  public Sellers: Seller[];

  constructor(private modalService: NgbModal, private sellerService: SellerService) {
  }

  ngOnInit() {
    this.Sellers = []; // Construct the arr. in case of failure we wont get an error in the view.
    this.sellerService.getSellers().subscribe(data => {
      if (data) {
        this.Sellers = data;
      }
      else {
        console.log('Something terrible has happened to our server!');
      }
    });
  }

  newSeller() {
    let newSeller = new Seller(0, '', '', '');
    this.popModal('Create a new seller', 'Create', newSeller, 'POST');
  }

  editSeller(seller: Seller) {
    this.popModal('Edit seller', 'Save', new Seller(seller.id, seller.name, seller.category, seller.imagePath), 'PUT');
  }

  popModal(title: string, okBut: string, seller: Seller, rest: string) {
    const modal = this.modalService.open(DialogComponent);
    modal.componentInstance.title = title;
    modal.componentInstance.onOkButton = okBut;
    modal.componentInstance.seller = seller;
    modal.result.then(obj => {
      console.log(JSON.stringify(obj));
      this.addSellerToDb(obj, rest);

    }).catch(err => {
      console.log(err);
    })
  }

  addSellerToDb(seller: Seller, rest: string) {
    if (rest === 'POST') {
      this.sellerService.postSingleSeller(seller).subscribe(data => {
        this.updateUserList(data);
      });
    }
    if (rest === 'PUT') {
      this.sellerService.putSingleSeller(seller).subscribe(data => {
        this.updateUserList(data);
      });
    }
  }

  updateUserList(newSeller: Seller) {
    let obj = _.findIndex(this.Sellers, seller => {
      return seller.id === newSeller.id
    });
    if (obj > -1) {
      this.Sellers[obj] = newSeller;
    }
    else {
      this.Sellers.push(newSeller);
    }

  }
}
