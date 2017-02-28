
export class Seller {
  id: number;
  name: string;
  category: string;
  imagePath: string;

  constructor(id, name, category, imagePath){
    this.id = id;
    this.name = name;
    this.category = category;
    this.imagePath = imagePath;
  }
}
