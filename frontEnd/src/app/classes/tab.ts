import { Product } from './product';

export class Tab {
  title: string;
  products: any[];
  constructor(title, products) {
    this.title = title;
    this.products = products;
  }
}
