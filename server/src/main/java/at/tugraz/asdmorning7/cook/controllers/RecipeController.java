package at.tugraz.asdmorning7.cook.controllers;

import at.tugraz.asdmorning7.cook.models.Recipe;
import at.tugraz.asdmorning7.cook.repositories.RepositoryHandler;
import at.tugraz.asdmorning7.cook.exceptions.RecipeNotFoundException;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import java.util.List;

@RestController
public class RecipeController{

  private final RepositoryHandler repository;

  public RecipeController(RepositoryHandler repository) {
    this.repository = repository;
  }

  @PostMapping("recipes")
  public Recipe addRecipe(@RequestBody Recipe newRecipe) {
    return repository.save(newRecipe);
  }

  @GetMapping("recipes")
  public List<Recipe> all() {
    return repository.findAll();
  }

  // Single item
  @GetMapping("recipes/{id}")
  Recipe one(@PathVariable Long id) {

    return repository.findById(id)
            .orElseThrow(() -> new RecipeNotFoundException(id));
  }

  @PutMapping("recipes/{id}")
  Recipe replaceEmployee(@RequestBody Recipe newRecipe, @PathVariable Long id) {

    return repository.findById(id)
            .map(recipe -> {
                recipe.setName(newRecipe.getName());
                recipe.setDescription(newRecipe.getDescription());
                return repository.save(recipe);
            })
            .orElseGet(() -> {
                newRecipe.setId(id);
                return repository.save(newRecipe);
            });
  }

  @DeleteMapping("recipe/delete/{id}")
  void deleteRecipe(@PathVariable Long id) {
    repository.deleteById(id);
  }

}
