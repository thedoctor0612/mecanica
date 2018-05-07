package org.ms.mecanica.web.rest;

import org.ms.mecanica.MecanicaApp;

import org.ms.mecanica.domain.Bloc;
import org.ms.mecanica.repository.BlocRepository;
import org.ms.mecanica.service.BlocService;
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
 * Test class for the BlocResource REST controller.
 *
 * @see BlocResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MecanicaApp.class)
public class BlocResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Boolean DEFAULT_VALIDE = false;
    private static final Boolean UPDATED_VALIDE = true;

    @Autowired
    private BlocRepository blocRepository;

    @Autowired
    private BlocService blocService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBlocMockMvc;

    private Bloc bloc;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BlocResource blocResource = new BlocResource(blocService);
        this.restBlocMockMvc = MockMvcBuilders.standaloneSetup(blocResource)
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
    public static Bloc createEntity(EntityManager em) {
        Bloc bloc = new Bloc()
            .code(DEFAULT_CODE)
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .valide(DEFAULT_VALIDE);
        return bloc;
    }

    @Before
    public void initTest() {
        bloc = createEntity(em);
    }

    @Test
    @Transactional
    public void createBloc() throws Exception {
        int databaseSizeBeforeCreate = blocRepository.findAll().size();

        // Create the Bloc
        restBlocMockMvc.perform(post("/api/blocs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bloc)))
            .andExpect(status().isCreated());

        // Validate the Bloc in the database
        List<Bloc> blocList = blocRepository.findAll();
        assertThat(blocList).hasSize(databaseSizeBeforeCreate + 1);
        Bloc testBloc = blocList.get(blocList.size() - 1);
        assertThat(testBloc.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testBloc.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testBloc.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testBloc.isValide()).isEqualTo(DEFAULT_VALIDE);
    }

    @Test
    @Transactional
    public void createBlocWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = blocRepository.findAll().size();

        // Create the Bloc with an existing ID
        bloc.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBlocMockMvc.perform(post("/api/blocs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bloc)))
            .andExpect(status().isBadRequest());

        // Validate the Bloc in the database
        List<Bloc> blocList = blocRepository.findAll();
        assertThat(blocList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBlocs() throws Exception {
        // Initialize the database
        blocRepository.saveAndFlush(bloc);

        // Get all the blocList
        restBlocMockMvc.perform(get("/api/blocs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bloc.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].valide").value(hasItem(DEFAULT_VALIDE.booleanValue())));
    }

    @Test
    @Transactional
    public void getBloc() throws Exception {
        // Initialize the database
        blocRepository.saveAndFlush(bloc);

        // Get the bloc
        restBlocMockMvc.perform(get("/api/blocs/{id}", bloc.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bloc.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.valide").value(DEFAULT_VALIDE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingBloc() throws Exception {
        // Get the bloc
        restBlocMockMvc.perform(get("/api/blocs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBloc() throws Exception {
        // Initialize the database
        blocService.save(bloc);

        int databaseSizeBeforeUpdate = blocRepository.findAll().size();

        // Update the bloc
        Bloc updatedBloc = blocRepository.findOne(bloc.getId());
        // Disconnect from session so that the updates on updatedBloc are not directly saved in db
        em.detach(updatedBloc);
        updatedBloc
            .code(UPDATED_CODE)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .valide(UPDATED_VALIDE);

        restBlocMockMvc.perform(put("/api/blocs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBloc)))
            .andExpect(status().isOk());

        // Validate the Bloc in the database
        List<Bloc> blocList = blocRepository.findAll();
        assertThat(blocList).hasSize(databaseSizeBeforeUpdate);
        Bloc testBloc = blocList.get(blocList.size() - 1);
        assertThat(testBloc.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testBloc.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testBloc.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testBloc.isValide()).isEqualTo(UPDATED_VALIDE);
    }

    @Test
    @Transactional
    public void updateNonExistingBloc() throws Exception {
        int databaseSizeBeforeUpdate = blocRepository.findAll().size();

        // Create the Bloc

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBlocMockMvc.perform(put("/api/blocs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bloc)))
            .andExpect(status().isCreated());

        // Validate the Bloc in the database
        List<Bloc> blocList = blocRepository.findAll();
        assertThat(blocList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBloc() throws Exception {
        // Initialize the database
        blocService.save(bloc);

        int databaseSizeBeforeDelete = blocRepository.findAll().size();

        // Get the bloc
        restBlocMockMvc.perform(delete("/api/blocs/{id}", bloc.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Bloc> blocList = blocRepository.findAll();
        assertThat(blocList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Bloc.class);
        Bloc bloc1 = new Bloc();
        bloc1.setId(1L);
        Bloc bloc2 = new Bloc();
        bloc2.setId(bloc1.getId());
        assertThat(bloc1).isEqualTo(bloc2);
        bloc2.setId(2L);
        assertThat(bloc1).isNotEqualTo(bloc2);
        bloc1.setId(null);
        assertThat(bloc1).isNotEqualTo(bloc2);
    }
}
