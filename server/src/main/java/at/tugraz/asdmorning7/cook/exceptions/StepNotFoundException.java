package at.tugraz.asdmorning7.cook.exceptions;

public class StepNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 5882304892064699042L;

    public StepNotFoundException(Long id) {
        super("Could not find resource" + id);
    }
}