package org.ms.mecanica.web.rest;

import org.ms.mecanica.MecanicaApp;

import org.ms.mecanica.domain.Marque;
import org.ms.mecanica.repository.MarqueRepository;
import org.ms.mecanica.service.MarqueService;
import org.ms.mecanica.web.rest.errors.ExceptionTranslator;

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
import java.util.List;

import static org.ms.mecanica.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MarqueResource REST controller.
 *
 * @see MarqueResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MecanicaApp.class)
public class MarqueResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Boolean DEFAULT_VALIDE = false;
    private static final Boolean UPDATED_VALIDE = true;

    @Autowired
    private MarqueRepository marqueRepository;

    @Autowired
    private MarqueService marqueService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMarqueMockMvc;

    private Marque marque;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MarqueResource marqueResource = new MarqueResource(marqueService);
        this.restMarqueMockMvc = MockMvcBuilders.standaloneSetup(marqueResource)
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
    public static Marque createEntity(EntityManager em) {
        Marque marque = new Marque()
            .code(DEFAULT_CODE)
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .valide(DEFAULT_VALIDE);
        return marque;
    }

    @Before
    public void initTest() {
        marque = createEntity(em);
    }

    @Test
    @Transactional
    public void createMarque() throws Exception {
        int databaseSizeBeforeCreate = marqueRepository.findAll().size();

        // Create the Marque
        restMarqueMockMvc.perform(post("/api/marques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(marque)))
            .andExpect(status().isCreated());

        // Validate the Marque in the database
        List<Marque> marqueList = marqueRepository.findAll();
        assertThat(marqueList).hasSize(databaseSizeBeforeCreate + 1);
        Marque testMarque = marqueList.get(marqueList.size() - 1);
        assertThat(testMarque.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testMarque.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testMarque.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testMarque.isValide()).isEqualTo(DEFAULT_VALIDE);
    }

    @Test
    @Transactional
    public void createMarqueWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = marqueRepository.findAll().size();

        // Create the Marque with an existing ID
        marque.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMarqueMockMvc.perform(post("/api/marques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(marque)))
            .andExpect(status().isBadRequest());

        // Validate the Marque in the database
        List<Marque> marqueList = marqueRepository.findAll();
        assertThat(marqueList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMarques() throws Exception {
        // Initialize the database
        marqueRepository.saveAndFlush(marque);

        // Get all the marqueList
        restMarqueMockMvc.perform(get("/api/marques?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(marque.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].valide").value(hasItem(DEFAULT_VALIDE.booleanValue())));
    }

    @Test
    @Transactional
    public void getMarque() throws Exception {
        // Initialize the database
        marqueRepository.saveAndFlush(marque);

        // Get the marque
        restMarqueMockMvc.perform(get("/api/marques/{id}", marque.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(marque.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.valide").value(DEFAULT_VALIDE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingMarque() throws Exception {
        // Get the marque
        restMarqueMockMvc.perform(get("/api/marques/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMarque() throws Exception {
        // Initialize the database
        marqueService.save(marque);

        int databaseSizeBeforeUpdate = marqueRepository.findAll().size();

        // Update the marque
        Marque updatedMarque = marqueRepository.findOne(marque.getId());
        // Disconnect from session so that the updates on updatedMarque are not directly saved in db
        em.detach(updatedMarque);
        updatedMarque
            .code(UPDATED_CODE)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .valide(UPDATED_VALIDE);

        restMarqueMockMvc.perform(put("/api/marques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMarque)))
            .andExpect(status().isOk());

        // Validate the Marque in the database
        List<Marque> marqueList = marqueRepository.findAll();
        assertThat(marqueList).hasSize(databaseSizeBeforeUpdate);
        Marque testMarque = marqueList.get(marqueList.size() - 1);
        assertThat(testMarque.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testMarque.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testMarque.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testMarque.isValide()).isEqualTo(UPDATED_VALIDE);
    }

    @Test
    @Transactional
    public void updateNonExistingMarque() throws Exception {
        int databaseSizeBeforeUpdate = marqueRepository.findAll().size();

        // Create the Marque

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMarqueMockMvc.perform(put("/api/marques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(marque)))
            .andExpect(status().isCreated());

        // Validate the Marque in the database
        List<Marque> marqueList = marqueRepository.findAll();
        assertThat(marqueList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMarque() throws Exception {
        // Initialize the database
        marqueService.save(marque);

        int databaseSizeBeforeDelete = marqueRepository.findAll().size();

        // Get the marque
        restMarqueMockMvc.perform(delete("/api/marques/{id}", marque.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Marque> marqueList = marqueRepository.findAll();
        assertThat(marqueList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Marque.class);
        Marque marque1 = new Marque();
        marque1.setId(1L);
        Marque marque2 = new Marque();
        marque2.setId(marque1.getId());
        assertThat(marque1).isEqualTo(marque2);
        marque2.setId(2L);
        assertThat(marque1).isNotEqualTo(marque2);
        marque1.setId(null);
        assertThat(marque1).isNotEqualTo(marque2);
    }
}
