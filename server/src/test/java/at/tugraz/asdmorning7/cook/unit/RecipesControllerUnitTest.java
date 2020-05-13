package at.tugraz.asdmorning7.cook.unit;

import at.tugraz.asdmorning7.cook.models.Recipe;
import at.tugraz.asdmorning7.cook.controllers.RecipeController;
import at.tugraz.asdmorning7.cook.repositories.RecipeRepository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.List;

import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import static org.mockito.Mockito.*;

import org.json.*;

import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@WebMvcTest(RecipeController.class)
class RecipesControllerUnitTest {

    @MockBean
    private RecipeRepository repository;

    @Autowired
    private MockMvc mockMvc;

    private String asJsonString(Recipe r) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(r);
    }

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

        assertEquals(recipes.size(), jsonArray.length());
    }

    @Test
    public void getRecipeByIdTest() throws Exception {
        Long expectedId = 1L;
        Recipe r1 = new Recipe("r1", "d1", "t1", 1, 1, "i1", "thumbnail1", false, null);

        when(repository.findById(expectedId)).thenReturn(java.util.Optional.of(r1));

        MvcResult result = this.mockMvc.perform(
                get("/api/recipes/{id}", expectedId)
        ).andExpect(status().isOk()).andReturn();

        String content = result.getResponse().getContentAsString();
        JSONObject jsonArray = new JSONObject(content);

        assertEquals(r1.getName(), jsonArray.getString("name"));
    }

    @Test
    public void insertTest() throws Exception {
        Recipe r1 = new Recipe("r1", "d1", "t1", 1, 1, "i1", "thumbnail1", false, null);

        // Note: it is important to mock repository.save on: 'Mockito.any(Recipe.class)'
        // Otherwise it would fail and an empty response body would be received
        when(repository.save(Mockito.any(Recipe.class))).thenReturn(r1);

        MockHttpServletRequestBuilder builder = MockMvcRequestBuilders
                .post("/api/recipes")
                .accept(MediaType.APPLICATION_JSON)
                .content(asJsonString(r1))                  // send content as JSON string
                .contentType(MediaType.APPLICATION_JSON);

        // send request; Note: response is just 200 OK
        MvcResult res = mockMvc.perform(builder)
                .andExpect(status().isOk())
                .andReturn();

        // check response
        System.out.println(res.getResponse().getContentAsString());
        assertEquals(asJsonString(r1), res.getResponse().getContentAsString());

        // check if save was called exactly one time
        ArgumentCaptor<Recipe> recipeCaptor = ArgumentCaptor.forClass(Recipe.class);
        verify(repository, times(1)).save(recipeCaptor.capture());

        assert(recipeCaptor.getValue().getName().equals(r1.getName()) &&
                recipeCaptor.getValue().getThumbnail().equals(r1.getThumbnail()));
    }
}
