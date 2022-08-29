import { Food } from "./food";

export class CartItem{
  constructor(public food:Food){
  }
  quantity:number=1;
  itemsPrice:number =this.food.price;
}
