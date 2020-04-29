package at.tugraz.asdmorning7.cook.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class StepNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 5882304892064699042L;

    public StepNotFoundException(Long id) {
        super("Could not find resource " + id);
    }
}