export interface Product {
  id?: string;
  _id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image?: string;
  mainImage: string;
  images?: string[];
}