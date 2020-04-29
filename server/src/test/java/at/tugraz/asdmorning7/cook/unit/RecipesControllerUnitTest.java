package at.tugraz.asdmorning7.cook.unit;

import at.tugraz.asdmorning7.cook.models.Recipe;
import at.tugraz.asdmorning7.cook.controllers.RecipeController;
import at.tugraz.asdmorning7.cook.repositories.RecipeRepository;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.ArrayList;
import java.util.List;

import org.json.*;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;
import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@WebMvcTest(RecipeController.class)
class RecipesControllerUnitTest {

    @MockBean
    private RecipeRepository repository;

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void getAllRecipesTest() throws Exception {
        List<Recipe> recipes = new ArrayList<Recipe>();
        // Recipe(String name, String description, String type, int preparationTime, int cookingTime,
        // String cookingInstructions, String thumbnail, boolean isFavorite, Set<Step> steps)
        recipes.add(new Recipe("r1", "d1", "t1", 1, 1, "do something", "thumbnail1", false, null));
        recipes.add(new Recipe("r2", "d2", "t2", 2, 2, "do something", "thumbnail2", true, null));
        recipes.add(new Recipe("r3", "d3", "t3", 3, 3, "do something", "thumbnail3", false, null));

        when(repository.findAll()).thenReturn(recipes);

        MvcResult result = this.mockMvc.perform(get("/api/recipes")).andExpect(status().isOk()).andReturn();

        // get body of HTTP result
        String content = result.getResponse().getContentAsString();
        JSONArray jsonArray = new JSONArray(content);

        // print content
        for(int i = 0; i < jsonArray.length(); i++)
            System.out.println(jsonArray.get(i));

        assertEquals(recipes.size(), jsonArray.length());
	}
}