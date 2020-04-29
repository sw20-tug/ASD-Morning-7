package at.tugraz.asdmorning7.cook.repositories;

import at.tugraz.asdmorning7.cook.models.Recipe;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
}