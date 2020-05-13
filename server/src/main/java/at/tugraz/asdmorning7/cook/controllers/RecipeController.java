package at.tugraz.asdmorning7.cook.controllers;

import at.tugraz.asdmorning7.cook.models.Recipe;
import at.tugraz.asdmorning7.cook.repositories.RecipeRepository;
import at.tugraz.asdmorning7.cook.exceptions.RecipeNotFoundException;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("api/recipes")
public class RecipeController {

    private final RecipeRepository repository;

    public RecipeController(RecipeRepository repository) {
        this.repository = repository;
    }

    @GetMapping("")
    public List<Recipe> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    Recipe getById(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new RecipeNotFoundException(id));
    }

    @PostMapping("")
    public Recipe insert(@RequestBody Recipe recipe) {
        return repository.save(recipe);
    }

    @PutMapping("/{id}")
    Recipe update(@RequestBody Recipe newRecipe, @PathVariable Long id) {
        return repository.findById(id).map(recipe -> {
            recipe.setName(newRecipe.getName());
            recipe.setDescription(newRecipe.getDescription());
            recipe.setType(newRecipe.getType());
            recipe.setCookingTime(newRecipe.getCookingTime());
            recipe.setPreparationTime(newRecipe.getPreparationTime());
            recipe.setThumbnail(newRecipe.getThumbnail());
            return repository.save(recipe);
        }).orElseThrow(() -> new RecipeNotFoundException(id));
    }

    @PutMapping("/{id}/rename")
    Recipe rename(@RequestBody Recipe newRecipe, @PathVariable Long id) {
        return repository.findById(id).map(recipe -> {
            recipe.setName(newRecipe.getName());
            return repository.save(recipe);
        }).orElseThrow(() -> new RecipeNotFoundException(id));
    }

    @DeleteMapping("/{id}")
    void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
