import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from '../dialog/dialog.component';
import { Seller } from '../classes/seller';
import { SellerService } from '../apiServices/seller.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent implements OnInit {

  closeResult: string;
  public Sellers: Seller[];

  constructor(private modalService: NgbModal, private sService: SellerService ) {
  }

  ngOnInit() {
    this.Sellers = []; // Construct the arr. in case of failure we wont get an error in the view.
    this.sService.getSellers().subscribe(data => {
      if(data){
        this.Sellers = data;
      }
      else{
        console.log('Something terrible has happened to our server!');
      }
    });
  }

  open(edit) {
    this.modalService.open(edit).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }

  addEditSeller() {
    const modal = this.modalService.open(DialogComponent);
    modal.componentInstance.seller = 'Andri';
    modal.result.then(obj => {
      console.log('dialog was closed by pressing the Ok button!');
      console.log('this is the new obj: ' + obj);
    }).catch(err => {
      console.log('dialog was canceled!');
      console.log(err);
    })
  };
}
