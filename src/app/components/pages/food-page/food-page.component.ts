import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {

  food!:Food;  //Food property of type Food  ...v injecting activatedRoute
  constructor(activatedRoute:ActivatedRoute,private foodService:FoodService) {
    activatedRoute.params.subscribe((params)=>{
        if(params.id) //if not null of undefined
        this.food = this.foodService.getFoodById(params.id);
    })
   }


  ngOnInit(): void {
  }

}
