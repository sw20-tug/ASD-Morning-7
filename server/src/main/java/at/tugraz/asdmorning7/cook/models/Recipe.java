package at.tugraz.asdmorning7.cook.models;

import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Recipe {

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private String name;

    @Lob
    @NotNull
    private String description;

    @NotNull
    private String type;

    @NotNull
    private int cookingTime;

    @NotNull
    private int preparationTime;

    @Lob
    @NotNull
    private String thumbnail;

    @Lob
    @NotNull
    private String ingredients;

    private boolean isFavorite;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    @JsonManagedReference("recipe_steps")
    private List<Step> steps;

    public Recipe() {
    }

    public Recipe(String name, String description, String type, int preparationTime, int cookingTime,
            String cookingInstructions, String thumbnail, boolean isFavorite, String ingredients, List<Step> steps) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.preparationTime = preparationTime;
        this.cookingTime = cookingTime;
        this.thumbnail = thumbnail;
        this.isFavorite = isFavorite;
        this.ingredients = ingredients;
        this.steps = steps;
    }

    /*
     * Getters
     */
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getType() {
        return type;
    }

    public int getPreparationTime() {
        return preparationTime;
    }

    public int getCookingTime() {
        return cookingTime;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public boolean getIsFavorite() {
        return isFavorite;
    }

    public List<Step> getSteps() {
        return steps;
    }

    public String getIngredients() {
        return ingredients;
    }

    /*
     * Setters
     */
    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setPreparationTime(int preparationTime) {
        this.preparationTime = preparationTime;
    }

    public void setCookingTime(int cookingTime) {
        this.cookingTime = cookingTime;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public void setIsFavorite(boolean isFavorite) {
        this.isFavorite = isFavorite;
    }

    public void setSteps(List<Step> steps) {
        this.steps = steps;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }
}