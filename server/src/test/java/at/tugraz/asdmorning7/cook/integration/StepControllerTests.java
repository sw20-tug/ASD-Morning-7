package at.tugraz.asdmorning7.cook.integration;

import at.tugraz.asdmorning7.cook.controllers.StepController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;

@SpringBootTest
public class StepControllerTests {

    @Autowired
    private StepController controller;

    @Test
    public void contexLoads() throws Exception {
        assertThat(controller).isNotNull();
    }
}
