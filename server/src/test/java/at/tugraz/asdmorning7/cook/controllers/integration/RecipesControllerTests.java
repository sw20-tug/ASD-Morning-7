package at.tugraz.asdmorning7.cook.controllers.integration;

import at.tugraz.asdmorning7.cook.controllers.RecipesController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;

@SpringBootTest
public class RecipesControllerTests {

    @Autowired
    private RecipesController controller;

    @Test
    public void contexLoads() throws Exception {
        assertThat(controller).isNotNull();
    }
}
