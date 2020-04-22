package at.tugraz.asdmorning7.cook.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

@Entity
public class Recipe {

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String description;

    @NotNull
    private String type;

    @NotNull
    private int cookingTime;

    @NotNull
    private int preparationTime;

    @NotNull
    private String thumbnail;

    private boolean isFavorite;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    private Set<Step> steps = new HashSet<Step>();

    public Recipe() {
    }

    public Recipe(String name, String description, String type, int preparationTime, int cookingTime,
            String cookingInstructions, String thumbnail, boolean isFavorite, Set<Step> steps) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.preparationTime = preparationTime;
        this.cookingTime = cookingTime;
        this.thumbnail = thumbnail;
        this.isFavorite = isFavorite;
        this.steps = steps;
    }

    /*
     * Getters
     */
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

    public Set<Step> getSteps() {
        return steps;
    }

    /*
     * Setters
     */
    public void setId(Long id) {
        this.id = id;
    }

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

    public void setSteps(Set<Step> steps) {
        this.steps = steps;
    }
}