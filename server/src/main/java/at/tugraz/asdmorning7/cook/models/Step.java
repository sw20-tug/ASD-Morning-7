package at.tugraz.asdmorning7.cook.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

@Entity
public class Step {

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private Long number;

    @NotNull
    private String name;

    @NotNull
    private String content;

    @NotNull
    private String image;

    @ManyToOne
    @JoinColumn(name = "recipe_id", nullable = false)
    private Recipe recipe;

    public Step() {
    }

    public Step(Long number, String name, String content, String image, Recipe recipe) {
        this.number = number;
        this.name = name;
        this.content = content;
        this.image = image;
        this.recipe = recipe;
    }

    /*
     * Getters
     */
    public Long getNumber() {
        return number;
    }

    public String getName() {
        return name;
    }

    public String getContent() {
        return content;
    }

    public String getImage() {
        return image;
    }

    public Recipe getRecipe() {
        return recipe;
    }

    /*
     * Setters
     */
    public void setNumber(Long number) {
        this.number = number;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }
}