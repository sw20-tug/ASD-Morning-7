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
  private String category;
  private int preparationTime;
  private int cookingTime;
  private String cookingInstructions;
  private String photoPath;
  private boolean isFavorite;

  public Recipe() {}

  public Recipe(String name, String description, String category, int preparationTime, int cookingTime,
      String cookingInstructions, String photoPath, boolean isFavorite) {
    this.name = name;
    this.description = description;
    this.category = category;
    this.preparationTime = preparationTime;
    this.cookingTime = cookingTime;
    this.cookingInstructions = cookingInstructions;
    this.photoPath = photoPath;
    this.isFavorite = isFavorite;
  }

  // ----------------------------Getter---------------------------------
  // -------------------------------------------------------------------
  public String getName() {
    return name;
  }

  public String getDescription() {
    return description;
  }

  public String getCategory() {
    return category;
  }

  public int getPreparationTime() {
    return preparationTime;
  }

  public int getCookingTime() {
    return cookingTime;
  }

  public String getCookingInstructions() {
    return cookingInstructions;
  }

  public String getPhotoPath() {
    return photoPath;
  }

  public boolean getIsFavorite() {
    return isFavorite;
  }

  // ----------------------------Setter---------------------------------
  // -------------------------------------------------------------------
  public void setId(Long id) {
    this.id = id;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public void setPreparationTime(int preparationTime) {
    this.preparationTime = preparationTime;
  }

  public void setCookingTime(int cookingTime) {
    this.cookingTime = cookingTime;
  }

  public void setCookingInstructions(String cookingInstructions) {
    this.cookingInstructions = cookingInstructions;
  }

  public void setPhotoPath(String photoPath) {
    this.photoPath = photoPath;
  }

  public void setIsFavorite(boolean isFavorite) {
    this.isFavorite = isFavorite;
  }
}