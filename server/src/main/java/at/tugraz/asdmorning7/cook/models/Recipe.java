package at.tugraz.asdmorning7.cook.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Recipe {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String description;
    private String type;
    private int cookingTime;
    private int preparationTime;
    private String thumbnail;
    private boolean isFavorite;

    public Recipe() {
    }

    public Recipe(String name, String description, String type, int preparationTime, int cookingTime,
            String cookingInstructions, String thumbnail, boolean isFavorite) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.preparationTime = preparationTime;
        this.cookingTime = cookingTime;
        this.thumbnail = thumbnail;
        this.isFavorite = isFavorite;
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
}