
export class Product {
    id: number;
    product: {
      id: number;
      name: string;
      price: number;
      quantitySold: number;
      quantityInStock: number;
      imagePath: string;
    }

    constructor(id, pId, name, price, quantitySold, quantityInStock, imagePath) {
        this.id = id;
        this.product.id = pId;
        this.product.name = name;
        this.product.price = price;
        this.product.quantitySold = quantitySold;
        this.product.quantityInStock = quantityInStock;
        this.product.imagePath = imagePath;
    }
}
