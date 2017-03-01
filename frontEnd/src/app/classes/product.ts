
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
        this.product = {
            'id': pId,
            'name': name,
            'price': price,
            'quantitySold': quantitySold,
            'quantityInStock': quantityInStock,
            'imagePath': imagePath
        };
    }
}
