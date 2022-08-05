import { Injectable } from '@angular/core';
import { sample_foods, sample_tags } from 'src/data';
import { Food } from '../shared/models/food';
import { Tag } from '../shared/tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll():Food[]{
    return sample_foods;
  }

  getAllFoodsBySearchTerm(searchTerm:string){
    return this.getAll().filter((food)=>{
      return food.name.toLowerCase().includes(searchTerm.toLowerCase());

    });
  }

  getAllTags():Tag[]{
    return sample_tags;
  }
  getAllFoodsByTag(tag: string):Food[]{
    return tag ==="All"?
    this.getAll():
    this.getAll().filter(food=>{
      return food.tags?.includes(tag)
    });
  }

  getFoodById(foodId: string):Food{
    return this.getAll().find(food =>{
      return food.id === foodId  //when this part is undefiend return
    }) ?? new Food();  //return new Food

  }

}
