package com.primerevenue.service.web.rest;

import com.primerevenue.service.JavaSpilledApp;

import com.primerevenue.service.domain.ChuckNorrisFacts;
import com.primerevenue.service.repository.ChuckNorrisFactsRepository;
import com.primerevenue.service.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.primerevenue.service.web.rest.TestUtil.sameInstant;
import static com.primerevenue.service.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ChuckNorrisFactsResource REST controller.
 *
 * @see ChuckNorrisFactsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JavaSpilledApp.class)
public class ChuckNorrisFactsResourceIntTest {

    private static final String DEFAULT_FACT = "AAAAAAAAAA";
    private static final String UPDATED_FACT = "BBBBBBBBBB";

    private static final Integer DEFAULT_KARATEPOWER = 1;
    private static final Integer UPDATED_KARATEPOWER = 2;

    private static final ZonedDateTime DEFAULT_CREATED_AT = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED_AT = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private ChuckNorrisFactsRepository chuckNorrisFactsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restChuckNorrisFactsMockMvc;

    private ChuckNorrisFacts chuckNorrisFacts;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ChuckNorrisFactsResource chuckNorrisFactsResource = new ChuckNorrisFactsResource(chuckNorrisFactsRepository);
        this.restChuckNorrisFactsMockMvc = MockMvcBuilders.standaloneSetup(chuckNorrisFactsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ChuckNorrisFacts createEntity(EntityManager em) {
        ChuckNorrisFacts chuckNorrisFacts = new ChuckNorrisFacts()
            .fact(DEFAULT_FACT)
            .karatepower(DEFAULT_KARATEPOWER)
            .created_at(DEFAULT_CREATED_AT);
        return chuckNorrisFacts;
    }

    @Before
    public void initTest() {
        chuckNorrisFacts = createEntity(em);
    }

    @Test
    @Transactional
    public void createChuckNorrisFacts() throws Exception {
        int databaseSizeBeforeCreate = chuckNorrisFactsRepository.findAll().size();

        // Create the ChuckNorrisFacts
        restChuckNorrisFactsMockMvc.perform(post("/api/chuck-norris-facts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chuckNorrisFacts)))
            .andExpect(status().isCreated());

        // Validate the ChuckNorrisFacts in the database
        List<ChuckNorrisFacts> chuckNorrisFactsList = chuckNorrisFactsRepository.findAll();
        assertThat(chuckNorrisFactsList).hasSize(databaseSizeBeforeCreate + 1);
        ChuckNorrisFacts testChuckNorrisFacts = chuckNorrisFactsList.get(chuckNorrisFactsList.size() - 1);
        assertThat(testChuckNorrisFacts.getFact()).isEqualTo(DEFAULT_FACT);
        assertThat(testChuckNorrisFacts.getKaratepower()).isEqualTo(DEFAULT_KARATEPOWER);
        assertThat(testChuckNorrisFacts.getCreated_at()).isEqualTo(DEFAULT_CREATED_AT);
    }

    @Test
    @Transactional
    public void createChuckNorrisFactsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = chuckNorrisFactsRepository.findAll().size();

        // Create the ChuckNorrisFacts with an existing ID
        chuckNorrisFacts.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restChuckNorrisFactsMockMvc.perform(post("/api/chuck-norris-facts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chuckNorrisFacts)))
            .andExpect(status().isBadRequest());

        // Validate the ChuckNorrisFacts in the database
        List<ChuckNorrisFacts> chuckNorrisFactsList = chuckNorrisFactsRepository.findAll();
        assertThat(chuckNorrisFactsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllChuckNorrisFacts() throws Exception {
        // Initialize the database
        chuckNorrisFactsRepository.saveAndFlush(chuckNorrisFacts);

        // Get all the chuckNorrisFactsList
        restChuckNorrisFactsMockMvc.perform(get("/api/chuck-norris-facts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(chuckNorrisFacts.getId().intValue())))
            .andExpect(jsonPath("$.[*].fact").value(hasItem(DEFAULT_FACT.toString())))
            .andExpect(jsonPath("$.[*].karatepower").value(hasItem(DEFAULT_KARATEPOWER)))
            .andExpect(jsonPath("$.[*].created_at").value(hasItem(sameInstant(DEFAULT_CREATED_AT))));
    }

    @Test
    @Transactional
    public void getChuckNorrisFacts() throws Exception {
        // Initialize the database
        chuckNorrisFactsRepository.saveAndFlush(chuckNorrisFacts);

        // Get the chuckNorrisFacts
        restChuckNorrisFactsMockMvc.perform(get("/api/chuck-norris-facts/{id}", chuckNorrisFacts.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(chuckNorrisFacts.getId().intValue()))
            .andExpect(jsonPath("$.fact").value(DEFAULT_FACT.toString()))
            .andExpect(jsonPath("$.karatepower").value(DEFAULT_KARATEPOWER))
            .andExpect(jsonPath("$.created_at").value(sameInstant(DEFAULT_CREATED_AT)));
    }

    @Test
    @Transactional
    public void getNonExistingChuckNorrisFacts() throws Exception {
        // Get the chuckNorrisFacts
        restChuckNorrisFactsMockMvc.perform(get("/api/chuck-norris-facts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateChuckNorrisFacts() throws Exception {
        // Initialize the database
        chuckNorrisFactsRepository.saveAndFlush(chuckNorrisFacts);
        int databaseSizeBeforeUpdate = chuckNorrisFactsRepository.findAll().size();

        // Update the chuckNorrisFacts
        ChuckNorrisFacts updatedChuckNorrisFacts = chuckNorrisFactsRepository.findOne(chuckNorrisFacts.getId());
        // Disconnect from session so that the updates on updatedChuckNorrisFacts are not directly saved in db
        em.detach(updatedChuckNorrisFacts);
        updatedChuckNorrisFacts
            .fact(UPDATED_FACT)
            .karatepower(UPDATED_KARATEPOWER)
            .created_at(UPDATED_CREATED_AT);

        restChuckNorrisFactsMockMvc.perform(put("/api/chuck-norris-facts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedChuckNorrisFacts)))
            .andExpect(status().isOk());

        // Validate the ChuckNorrisFacts in the database
        List<ChuckNorrisFacts> chuckNorrisFactsList = chuckNorrisFactsRepository.findAll();
        assertThat(chuckNorrisFactsList).hasSize(databaseSizeBeforeUpdate);
        ChuckNorrisFacts testChuckNorrisFacts = chuckNorrisFactsList.get(chuckNorrisFactsList.size() - 1);
        assertThat(testChuckNorrisFacts.getFact()).isEqualTo(UPDATED_FACT);
        assertThat(testChuckNorrisFacts.getKaratepower()).isEqualTo(UPDATED_KARATEPOWER);
        assertThat(testChuckNorrisFacts.getCreated_at()).isEqualTo(UPDATED_CREATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingChuckNorrisFacts() throws Exception {
        int databaseSizeBeforeUpdate = chuckNorrisFactsRepository.findAll().size();

        // Create the ChuckNorrisFacts

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restChuckNorrisFactsMockMvc.perform(put("/api/chuck-norris-facts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chuckNorrisFacts)))
            .andExpect(status().isCreated());

        // Validate the ChuckNorrisFacts in the database
        List<ChuckNorrisFacts> chuckNorrisFactsList = chuckNorrisFactsRepository.findAll();
        assertThat(chuckNorrisFactsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteChuckNorrisFacts() throws Exception {
        // Initialize the database
        chuckNorrisFactsRepository.saveAndFlush(chuckNorrisFacts);
        int databaseSizeBeforeDelete = chuckNorrisFactsRepository.findAll().size();

        // Get the chuckNorrisFacts
        restChuckNorrisFactsMockMvc.perform(delete("/api/chuck-norris-facts/{id}", chuckNorrisFacts.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ChuckNorrisFacts> chuckNorrisFactsList = chuckNorrisFactsRepository.findAll();
        assertThat(chuckNorrisFactsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ChuckNorrisFacts.class);
        ChuckNorrisFacts chuckNorrisFacts1 = new ChuckNorrisFacts();
        chuckNorrisFacts1.setId(1L);
        ChuckNorrisFacts chuckNorrisFacts2 = new ChuckNorrisFacts();
        chuckNorrisFacts2.setId(chuckNorrisFacts1.getId());
        assertThat(chuckNorrisFacts1).isEqualTo(chuckNorrisFacts2);
        chuckNorrisFacts2.setId(2L);
        assertThat(chuckNorrisFacts1).isNotEqualTo(chuckNorrisFacts2);
        chuckNorrisFacts1.setId(null);
        assertThat(chuckNorrisFacts1).isNotEqualTo(chuckNorrisFacts2);
    }
}
