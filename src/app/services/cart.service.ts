import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/cart';
import { CartItem } from '../shared/models/cartItem';
import { Food } from '../shared/models/food';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  //private cart:Cart = new Cart();
  //up not ok, because its not saving to local storage but creating new cart after refresh/revisit

  private cart:Cart = this.getCartFromLocalStorage();
  private cartSubject:BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() { }


  addToCart(food:Food){
    let cartItem = this.cart.items.find((item)=>{
        return item.food.id === food.id
    })
    //if this is true and the item already exists ,return
    if(cartItem) return;
    //else push the item into the cart ->CartItem module
    this.cart.items.push(new CartItem(food));
    //********Local Storage */
    this.setCartToLocalStorage();
  }

    //Remove from cart
    removeFromCart(foodId:string):void{
      this.cart.items = this.cart.items      //set filtred items to items and return the filtered items
      .filter((item)=>{                       //remove the passed foodId from the items
        return item.food.id != foodId;
      })
       //********Local Storage */
    this.setCartToLocalStorage();
    }


    changeCartQuantity(foodId:string,quantity:number){
        let cartItem = this.cart.items.find(item=>{
          return item.food.id === foodId;
        })
        if(!cartItem) return;     //NOT FOUND, then return

        cartItem.quantity = quantity;
        cartItem.itemsPrice = quantity*cartItem.food.price;

    //********Local Storage */
    this.setCartToLocalStorage();
    }

    clearCart(){
      this.cart = new Cart();
       //********Local Storage */
    this.setCartToLocalStorage();
    }

    getCartObservable():Observable<Cart>{
      return this.cartSubject.asObservable();
    }

    //local storage
    private setCartToLocalStorage():void{
      //value price and price to cart

      //reduce called per item , set defalut to 0, accumulator loop
      this.cart.totalPrice = this.cart.items.reduce((prevSum,curentItem)=>prevSum+curentItem.itemsPrice,0)
      this.cart.totalCount = this.cart.items.reduce((prevSum,currentItem)=>prevSum+currentItem.quantity,0)

      // this.cart.totalCount = this.cart.items.reduce((prevSum,curentItem)=>{
      //   return prevSum + curentItem.itemsPrice;
      // },0)
      //object to json
      const cartJson = JSON.stringify(this.cart);
      localStorage.setItem('Cart',cartJson);

      //notify all cart observale listners
      this.cartSubject.next(this.cart);
    }

    private getCartFromLocalStorage():Cart{
      const cartJson = localStorage.getItem('Cart');
      return cartJson?JSON.parse(cartJson):new Cart();
    }
}
