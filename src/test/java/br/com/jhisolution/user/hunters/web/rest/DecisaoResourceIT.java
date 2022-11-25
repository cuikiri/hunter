package br.com.jhisolution.user.hunters.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.com.jhisolution.user.hunters.IntegrationTest;
import br.com.jhisolution.user.hunters.domain.Decisao;
import br.com.jhisolution.user.hunters.repository.DecisaoRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link DecisaoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DecisaoResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_OBS = "AAAAAAAAAA";
    private static final String UPDATED_OBS = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/decisaos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private DecisaoRepository decisaoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDecisaoMockMvc;

    private Decisao decisao;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Decisao createEntity(EntityManager em) {
        Decisao decisao = new Decisao().nome(DEFAULT_NOME).obs(DEFAULT_OBS);
        return decisao;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Decisao createUpdatedEntity(EntityManager em) {
        Decisao decisao = new Decisao().nome(UPDATED_NOME).obs(UPDATED_OBS);
        return decisao;
    }

    @BeforeEach
    public void initTest() {
        decisao = createEntity(em);
    }

    @Test
    @Transactional
    void createDecisao() throws Exception {
        int databaseSizeBeforeCreate = decisaoRepository.findAll().size();
        // Create the Decisao
        restDecisaoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(decisao)))
            .andExpect(status().isCreated());

        // Validate the Decisao in the database
        List<Decisao> decisaoList = decisaoRepository.findAll();
        assertThat(decisaoList).hasSize(databaseSizeBeforeCreate + 1);
        Decisao testDecisao = decisaoList.get(decisaoList.size() - 1);
        assertThat(testDecisao.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testDecisao.getObs()).isEqualTo(DEFAULT_OBS);
    }

    @Test
    @Transactional
    void createDecisaoWithExistingId() throws Exception {
        // Create the Decisao with an existing ID
        decisao.setId(1L);

        int databaseSizeBeforeCreate = decisaoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDecisaoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(decisao)))
            .andExpect(status().isBadRequest());

        // Validate the Decisao in the database
        List<Decisao> decisaoList = decisaoRepository.findAll();
        assertThat(decisaoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = decisaoRepository.findAll().size();
        // set the field null
        decisao.setNome(null);

        // Create the Decisao, which fails.

        restDecisaoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(decisao)))
            .andExpect(status().isBadRequest());

        List<Decisao> decisaoList = decisaoRepository.findAll();
        assertThat(decisaoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllDecisaos() throws Exception {
        // Initialize the database
        decisaoRepository.saveAndFlush(decisao);

        // Get all the decisaoList
        restDecisaoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(decisao.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].obs").value(hasItem(DEFAULT_OBS)));
    }

    @Test
    @Transactional
    void getDecisao() throws Exception {
        // Initialize the database
        decisaoRepository.saveAndFlush(decisao);

        // Get the decisao
        restDecisaoMockMvc
            .perform(get(ENTITY_API_URL_ID, decisao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(decisao.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.obs").value(DEFAULT_OBS));
    }

    @Test
    @Transactional
    void getNonExistingDecisao() throws Exception {
        // Get the decisao
        restDecisaoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewDecisao() throws Exception {
        // Initialize the database
        decisaoRepository.saveAndFlush(decisao);

        int databaseSizeBeforeUpdate = decisaoRepository.findAll().size();

        // Update the decisao
        Decisao updatedDecisao = decisaoRepository.findById(decisao.getId()).get();
        // Disconnect from session so that the updates on updatedDecisao are not directly saved in db
        em.detach(updatedDecisao);
        updatedDecisao.nome(UPDATED_NOME).obs(UPDATED_OBS);

        restDecisaoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedDecisao.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedDecisao))
            )
            .andExpect(status().isOk());

        // Validate the Decisao in the database
        List<Decisao> decisaoList = decisaoRepository.findAll();
        assertThat(decisaoList).hasSize(databaseSizeBeforeUpdate);
        Decisao testDecisao = decisaoList.get(decisaoList.size() - 1);
        assertThat(testDecisao.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testDecisao.getObs()).isEqualTo(UPDATED_OBS);
    }

    @Test
    @Transactional
    void putNonExistingDecisao() throws Exception {
        int databaseSizeBeforeUpdate = decisaoRepository.findAll().size();
        decisao.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDecisaoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, decisao.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(decisao))
            )
            .andExpect(status().isBadRequest());

        // Validate the Decisao in the database
        List<Decisao> decisaoList = decisaoRepository.findAll();
        assertThat(decisaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDecisao() throws Exception {
        int databaseSizeBeforeUpdate = decisaoRepository.findAll().size();
        decisao.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDecisaoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(decisao))
            )
            .andExpect(status().isBadRequest());

        // Validate the Decisao in the database
        List<Decisao> decisaoList = decisaoRepository.findAll();
        assertThat(decisaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDecisao() throws Exception {
        int databaseSizeBeforeUpdate = decisaoRepository.findAll().size();
        decisao.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDecisaoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(decisao)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Decisao in the database
        List<Decisao> decisaoList = decisaoRepository.findAll();
        assertThat(decisaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDecisaoWithPatch() throws Exception {
        // Initialize the database
        decisaoRepository.saveAndFlush(decisao);

        int databaseSizeBeforeUpdate = decisaoRepository.findAll().size();

        // Update the decisao using partial update
        Decisao partialUpdatedDecisao = new Decisao();
        partialUpdatedDecisao.setId(decisao.getId());

        partialUpdatedDecisao.nome(UPDATED_NOME);

        restDecisaoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDecisao.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDecisao))
            )
            .andExpect(status().isOk());

        // Validate the Decisao in the database
        List<Decisao> decisaoList = decisaoRepository.findAll();
        assertThat(decisaoList).hasSize(databaseSizeBeforeUpdate);
        Decisao testDecisao = decisaoList.get(decisaoList.size() - 1);
        assertThat(testDecisao.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testDecisao.getObs()).isEqualTo(DEFAULT_OBS);
    }

    @Test
    @Transactional
    void fullUpdateDecisaoWithPatch() throws Exception {
        // Initialize the database
        decisaoRepository.saveAndFlush(decisao);

        int databaseSizeBeforeUpdate = decisaoRepository.findAll().size();

        // Update the decisao using partial update
        Decisao partialUpdatedDecisao = new Decisao();
        partialUpdatedDecisao.setId(decisao.getId());

        partialUpdatedDecisao.nome(UPDATED_NOME).obs(UPDATED_OBS);

        restDecisaoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDecisao.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDecisao))
            )
            .andExpect(status().isOk());

        // Validate the Decisao in the database
        List<Decisao> decisaoList = decisaoRepository.findAll();
        assertThat(decisaoList).hasSize(databaseSizeBeforeUpdate);
        Decisao testDecisao = decisaoList.get(decisaoList.size() - 1);
        assertThat(testDecisao.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testDecisao.getObs()).isEqualTo(UPDATED_OBS);
    }

    @Test
    @Transactional
    void patchNonExistingDecisao() throws Exception {
        int databaseSizeBeforeUpdate = decisaoRepository.findAll().size();
        decisao.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDecisaoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, decisao.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(decisao))
            )
            .andExpect(status().isBadRequest());

        // Validate the Decisao in the database
        List<Decisao> decisaoList = decisaoRepository.findAll();
        assertThat(decisaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDecisao() throws Exception {
        int databaseSizeBeforeUpdate = decisaoRepository.findAll().size();
        decisao.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDecisaoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(decisao))
            )
            .andExpect(status().isBadRequest());

        // Validate the Decisao in the database
        List<Decisao> decisaoList = decisaoRepository.findAll();
        assertThat(decisaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDecisao() throws Exception {
        int databaseSizeBeforeUpdate = decisaoRepository.findAll().size();
        decisao.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDecisaoMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(decisao)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Decisao in the database
        List<Decisao> decisaoList = decisaoRepository.findAll();
        assertThat(decisaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDecisao() throws Exception {
        // Initialize the database
        decisaoRepository.saveAndFlush(decisao);

        int databaseSizeBeforeDelete = decisaoRepository.findAll().size();

        // Delete the decisao
        restDecisaoMockMvc
            .perform(delete(ENTITY_API_URL_ID, decisao.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Decisao> decisaoList = decisaoRepository.findAll();
        assertThat(decisaoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
