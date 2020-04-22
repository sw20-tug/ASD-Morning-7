package at.tugraz.asdmorning7.cook.repositories;

import at.tugraz.asdmorning7.cook.models.Step;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StepRepository extends JpaRepository<Step, Long> {
}