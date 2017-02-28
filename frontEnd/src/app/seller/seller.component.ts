import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent implements OnInit {

  ngOnInit() {
  }

  closeResult: string;

  constructor(private modalService: NgbModal) {}

  open(edit) {
    this.modalService.open(edit).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }
}
