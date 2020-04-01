package at.tugraz.asdmorning7.cook.exceptions;

public class RecipeNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1026838365853320947L;

    public RecipeNotFoundException(Long id) {
        super("Could not find resource" + id);
    }
}