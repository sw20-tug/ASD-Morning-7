package at.tugraz.asdmorning7.cook.controllers;

import at.tugraz.asdmorning7.cook.models.Recipe;
import at.tugraz.asdmorning7.cook.repositories.RecipesRepository;
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
public class RecipesController {

    private final RecipesRepository repository;

    public RecipesController(RecipesRepository repository) {
        this.repository = repository;
    }

    @GetMapping("recipes")
    public List<Recipe> getAll() {
        return repository.findAll();
    }

    @GetMapping("recipes/{id}")
    Recipe getById(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new RecipeNotFoundException(id));
    }

    @PostMapping("recipes")
    public Recipe insert(@RequestBody Recipe recipe) {
        return repository.save(recipe);
    }

    @PutMapping("recipes/{id}")
    Recipe update(@RequestBody Recipe newRecipe, @PathVariable Long id) {
        return repository.findById(id).map(recipe -> {
            recipe.setName(newRecipe.getName());
            recipe.setDescription(newRecipe.getDescription());
            return repository.save(recipe);
        }).orElseGet(() -> {
            newRecipe.setId(id);
            return repository.save(newRecipe);
        });
    }

    @DeleteMapping("recipes/{id}")
    void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
