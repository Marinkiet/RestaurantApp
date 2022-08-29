import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {

  food!:Food;  //Food property of type Food  ...v injecting activatedRoute
  constructor(activatedRoute:ActivatedRoute,
    private foodService:FoodService,
    private cartService:CartService,
    private router:Router) {
    activatedRoute.params.subscribe((params)=>{
        if(params.id) //if not null of undefined
        this.food = this.foodService.getFoodById(params.id);
    })
   }


  ngOnInit(): void {
  }
  addToCart(){
    this.cartService.addToCart(this.food);

    //redirect to page
    this.router.navigateByUrl('/cart-page');
    //alert('added')
  }

}
