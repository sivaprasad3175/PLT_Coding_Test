export interface ProductListModel {
  response: Product[] | null; // Set the initial value to null or an empty array
  isLoading: boolean;
  error: string;
}
export interface Product {
  id: number;
  colour: string;
  name: string;
  price: number;
  img: string;
}
