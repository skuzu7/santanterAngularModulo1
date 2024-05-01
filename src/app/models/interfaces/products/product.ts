export interface Product {
  _id?: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  image?: string;
  amount: number;
  category_id: string;
}
