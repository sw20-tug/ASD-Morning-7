package at.tugraz.asdmorning7.cook.unit;

import at.tugraz.asdmorning7.cook.models.Recipe;
import at.tugraz.asdmorning7.cook.controllers.RecipeController;
import at.tugraz.asdmorning7.cook.repositories.RecipeRepository;
import at.tugraz.asdmorning7.cook.repositories.StepRepository;

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

    @MockBean
    private StepRepository stepRepository;

    @Autowired
    private MockMvc mockMvc;

    private String asJsonString(Recipe r) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(r);
    }

    @Test
    public void getAllRecipesTest() throws Exception {
        List<Recipe> recipes = new ArrayList<Recipe>();
        recipes.add(new Recipe("r1", "d1", "t1", 1, 1, "do something", "thumbnail1", false, "i1", null));
        recipes.add(new Recipe("r2", "d2", "t2", 2, 2, "do something", "thumbnail2", true, "i1", null));
        recipes.add(new Recipe("r3", "d3", "t3", 3, 3, "do something", "thumbnail3", false, "i1", null));

        when(repository.findAll()).thenReturn(recipes);

        MvcResult result = mockMvc.perform(
            get("/api/recipes")
        ).andExpect(status().isOk()).andReturn();
        String content = result.getResponse().getContentAsString();
        JSONArray jsonArray = new JSONArray(content);

        assertEquals(recipes.size(), jsonArray.length());
        verify(repository, times(1)).findAll();
    }

    @Test
    public void getRecipeByIdTest() throws Exception {
        Long expectedId = 1L;
        Recipe r1 = new Recipe("r1", "d1", "t1", 1, 1, "i1", "thumbnail1", false, "i1", null);

        when(repository.findById(expectedId)).thenReturn(java.util.Optional.of(r1));

        MvcResult result = mockMvc.perform(
            get("/api/recipes/{id}", expectedId)
        ).andExpect(status().isOk()).andReturn();

        String content = result.getResponse().getContentAsString();
        JSONObject jsonObject = new JSONObject(content);

        assertEquals(r1.getName(), jsonObject.getString("name"));
        verify(repository, times(1)).findById(expectedId);
    }

    @Test
    public void insertRecipe() throws Exception {
        Recipe r1 = new Recipe("r1", "d1", "t1", 1, 1, "i1", "thumbnail1", false, "i1", null);

        // Note: it is important to mock repository.save on: 'Mockito.any(Recipe.class)'
        // Otherwise it would fail and an empty response body would be received
        when(repository.save(Mockito.any(Recipe.class))).thenReturn(r1);

        MockHttpServletRequestBuilder builder = MockMvcRequestBuilders
            .post("/api/recipes")
            .accept(MediaType.APPLICATION_JSON)
            .content(asJsonString(r1))
            .contentType(MediaType.APPLICATION_JSON);

        // Send request; Note: response is just 200 OK
        MvcResult result = mockMvc.perform(builder).andExpect(status().isOk()).andReturn();

        assertEquals(asJsonString(r1), result.getResponse().getContentAsString());

        // Check if save was called exactly one time
        ArgumentCaptor<Recipe> recipeCaptor = ArgumentCaptor.forClass(Recipe.class);
        verify(repository, times(1)).save(recipeCaptor.capture());

        assert(recipeCaptor.getValue().getName().equals(r1.getName())
            && recipeCaptor.getValue().getThumbnail().equals(r1.getThumbnail()));
    }

    @Test
    public void renameRecipeTest() throws Exception {
        Long expectedId = 1L;
        Recipe r1 = new Recipe("r1", "d1", "t1", 1, 1, "i1", "thumbnail1", false, "i1", null);
        Recipe r2 = new Recipe("r2", "d1", "t1", 1, 1, "i1", "thumbnail1", false, "i1", null);

        when(repository.findById(expectedId)).thenReturn(java.util.Optional.of(r1));
        when(repository.save(Mockito.any(Recipe.class))).thenReturn(r2);

        MockHttpServletRequestBuilder builder = MockMvcRequestBuilders
            .put("/api/recipes/{id}/rename", expectedId)
            .accept(MediaType.APPLICATION_JSON)
            .content(asJsonString(r2))
            .contentType(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(builder).andExpect(status().isOk()).andReturn();
        String content = result.getResponse().getContentAsString();
        JSONObject jsonObject = new JSONObject(content);

        assertEquals(r2.getName(), jsonObject.getString("name"));
        verify(repository, times(1)).findById(expectedId);
        verify(repository, times(1)).save(Mockito.any(Recipe.class));
    }

    @Test
    public void updateTest() throws Exception {
        Long expectedId = 1L;
        Long errorId = 2L;
        Recipe r1 = new Recipe("r1", "d1", "t1", 1, 1, "i1", "thumbnail1", false, "i1", null);
        Recipe r2 = new Recipe("r2", "d2", "t2", 2, 2, "i2", "thumbnail2", true, "i2", null);

        when(repository.findById(expectedId)).thenReturn(java.util.Optional.of(r1));
        when(repository.save(Mockito.any(Recipe.class))).thenReturn(r2);

        MockHttpServletRequestBuilder builder = MockMvcRequestBuilders
            .put("/api/recipes/{id}", expectedId)
            .accept(MediaType.APPLICATION_JSON)
            .content(asJsonString(r2))
            .contentType(MediaType.APPLICATION_JSON);

        // Correct update
        MvcResult result = mockMvc.perform(builder).andExpect(status().isOk()).andReturn();
        String content = result.getResponse().getContentAsString();
        assertEquals(asJsonString(r2), content);

        // Update with non-existing ID
        this.mockMvc.perform(
            put("/api/recipes/{id}", errorId)
        ).andExpect(status().isBadRequest());

        verify(repository, times(1)).save(Mockito.any(Recipe.class));
    }

    @Test
    public void deleteTest() throws Exception {
        Long expectedId = 1L;
        Long errorId = 2L;
        doNothing().when(repository).deleteById(expectedId);
        doThrow(new IllegalArgumentException()).when(repository).deleteById(errorId);

        // Correct delete
        this.mockMvc.perform(
            delete("/api/recipes/{id}", expectedId)
        ).andExpect(status().isOk());

        // Delete with non-existing ID
        try {
            this.mockMvc.perform(
                delete("/api/recipes/{id}", errorId)
            ).andExpect(status().isOk());
        }
        catch (Exception e) {
            assert(e.getMessage().contains("java.lang.IllegalArgumentException"));
        }

        verify(repository, times(1)).deleteById(expectedId);
        verify(repository, times(1)).deleteById(errorId);
    }
}