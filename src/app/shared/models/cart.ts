import { CartItem } from "./cartItem";

export class Cart{
  items:CartItem[]=[];  //call the items and set to empty to avoid undefiend
  totalPrice:number = 0;
  totalCount:number=0;

}
