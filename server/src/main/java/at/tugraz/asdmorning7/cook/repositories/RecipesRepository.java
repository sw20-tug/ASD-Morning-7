package at.tugraz.asdmorning7.cook.repositories;

import at.tugraz.asdmorning7.cook.models.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipesRepository extends JpaRepository<Recipe, Long> {
}