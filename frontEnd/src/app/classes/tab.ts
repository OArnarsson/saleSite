import { Product } from './product';

export class Tab {
  title: string;
  products: Product[];
  constructor(title, products){
    this.title = title;
    this.products = products;
  }
}
