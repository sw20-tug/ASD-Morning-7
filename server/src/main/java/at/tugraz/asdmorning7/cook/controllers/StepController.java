package at.tugraz.asdmorning7.cook.controllers;

import at.tugraz.asdmorning7.cook.exceptions.StepNotFoundException;
import at.tugraz.asdmorning7.cook.models.Step;
import at.tugraz.asdmorning7.cook.repositories.StepRepository;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/steps")
public class StepController {

    private final StepRepository repository;

    public StepController(StepRepository repository) {
        this.repository = repository;
    }

    @GetMapping("")
    public List<Step> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    Step getById(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new StepNotFoundException(id));
    }

    @PostMapping("")
    public Step insert(@RequestBody Step step) {
        return repository.save(step);
    }

    @PutMapping("/{id}")
    Step update(@RequestBody Step newStep, @PathVariable Long id) {
        return repository.findById(id).map(step -> {
            step.setNumber(newStep.getNumber());
            step.setName(newStep.getName());
            step.setContent(newStep.getContent());
            step.setImage(newStep.getImage());
            return repository.save(step);
        }).orElseThrow(() -> new StepNotFoundException(id));
    }

    @DeleteMapping("/{id}")
    void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}