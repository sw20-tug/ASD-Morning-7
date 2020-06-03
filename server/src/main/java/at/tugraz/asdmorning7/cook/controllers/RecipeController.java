package at.tugraz.asdmorning7.cook.controllers;

import at.tugraz.asdmorning7.cook.models.Recipe;
import at.tugraz.asdmorning7.cook.models.Step;
import at.tugraz.asdmorning7.cook.repositories.RecipeRepository;
import at.tugraz.asdmorning7.cook.repositories.StepRepository;
import at.tugraz.asdmorning7.cook.exceptions.RecipeNotFoundException;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

class StepComperator implements Comparator<Step> {
    @Override
    public int compare(Step s1, Step s2) {
        return s1.getNumber().compareTo(s2.getNumber());
    }
}

@CrossOrigin
@RestController
@RequestMapping("api/recipes")
public class RecipeController {

    @Autowired
    private final RecipeRepository repository;

    @Autowired
    private final StepRepository stepRepository;

    public RecipeController(RecipeRepository repository, StepRepository stepRepository) {
        this.repository = repository;
        this.stepRepository = stepRepository;
    }

    @GetMapping("")
    public List<Recipe> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    Recipe getById(@PathVariable Long id) {
        Recipe recipe = repository.findById(id).orElseThrow(() -> new RecipeNotFoundException(id));
        return recipe;
    }

    @PostMapping("")
    public Recipe insert(@RequestBody Recipe recipe) {

        if(recipe.getSteps() != null)
            recipe.getSteps().sort(new StepComperator());

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
            recipe.setIngredients(newRecipe.getIngredients());
            recipe.setIsFavorite(newRecipe.getIsFavorite());
            stepRepository.deleteInBatch(recipe.getSteps());

            if(recipe.getSteps() != null)
                newRecipe.getSteps().sort(new StepComperator());

            recipe.setSteps(newRecipe.getSteps());
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
