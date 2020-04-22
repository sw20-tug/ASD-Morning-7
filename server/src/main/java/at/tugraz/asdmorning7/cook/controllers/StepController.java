package at.tugraz.asdmorning7.cook.controllers;

import at.tugraz.asdmorning7.cook.exceptions.StepNotFoundException;
import at.tugraz.asdmorning7.cook.models.Step;
import at.tugraz.asdmorning7.cook.repositories.StepRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import java.util.List;

@RestController
public class StepController {

    private final StepRepository repository;

    public StepController(StepRepository repository) {
        this.repository = repository;
    }

    @GetMapping("steps")
    public List<Step> getAll() {
        return repository.findAll();
    }

    @GetMapping("steps/{id}")
    Step getById(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new StepNotFoundException(id));
    }

    @PostMapping("steps")
    public Step insert(@RequestBody Step step) {
        return repository.save(step);
    }

    @PutMapping("steps/{id}")
    Step update(@RequestBody Step newStep, @PathVariable Long id) {
        return repository.findById(id).map(step -> {
            step.setName(newStep.getName());
            step.setContent(newStep.getContent());
            return repository.save(step);
        }).orElseGet(() -> {
            return repository.save(newStep);
        });
    }

    @DeleteMapping("steps/{id}")
    void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}