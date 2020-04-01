package at.tugraz.asdmorning7.cook.exceptions;


@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Actor Not Found")
public class RecipeNotFoundException extends RuntimeException {

  public RecipeNotFoundException(Long id) {
    super("Could not find recipe " + id);
  }
}