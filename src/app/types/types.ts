export interface Flavor {
  flavor: string;
  price: number;
  amount: number;
  points: number;
}
export interface Order {
  flavors: Flavor[];
  dough: string;
  size: string;
  sizePrice: number;
  price: number;
  points: number;
}
