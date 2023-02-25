import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'Sandwich', 
            'A super-tasty Sandwich!', 
            'https://www.verywellfit.com/thmb/QfHkFxb5HlW7qWK9qjSFRsRH8gA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/turkey-sandwich-09f5e7ad540f4f28994e80bdd9af05db.jpg',
            [
                new Ingredient('Bread' , 2),
                new Ingredient('Onion' , 1)
            ]
            ),
        new Recipe(
            'Burger', 
            'What else u need to say?', 
            'https://www.indianhealthyrecipes.com/wp-content/uploads/2016/02/veg-burger-recipe-1.jpg',
            [
                new Ingredient('Buns' , 2),
                new Ingredient('Cheese' , 1)
            ]
            )
      ];

      constructor(private slService: ShoppingListService) {}

      getRecipe() {
        return this.recipes.slice();
      }

      getRecipes(index: number) {
        return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }
}