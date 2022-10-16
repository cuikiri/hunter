package br.com.jhisolution.user.hunters.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.com.jhisolution.user.hunters.IntegrationTest;
import br.com.jhisolution.user.hunters.domain.Acao;
import br.com.jhisolution.user.hunters.repository.AcaoRepository;
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
 * Integration tests for the {@link AcaoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AcaoResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_OBS = "AAAAAAAAAA";
    private static final String UPDATED_OBS = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/acaos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private AcaoRepository acaoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAcaoMockMvc;

    private Acao acao;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Acao createEntity(EntityManager em) {
        Acao acao = new Acao().nome(DEFAULT_NOME).obs(DEFAULT_OBS);
        return acao;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Acao createUpdatedEntity(EntityManager em) {
        Acao acao = new Acao().nome(UPDATED_NOME).obs(UPDATED_OBS);
        return acao;
    }

    @BeforeEach
    public void initTest() {
        acao = createEntity(em);
    }

    @Test
    @Transactional
    void createAcao() throws Exception {
        int databaseSizeBeforeCreate = acaoRepository.findAll().size();
        // Create the Acao
        restAcaoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(acao)))
            .andExpect(status().isCreated());

        // Validate the Acao in the database
        List<Acao> acaoList = acaoRepository.findAll();
        assertThat(acaoList).hasSize(databaseSizeBeforeCreate + 1);
        Acao testAcao = acaoList.get(acaoList.size() - 1);
        assertThat(testAcao.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testAcao.getObs()).isEqualTo(DEFAULT_OBS);
    }

    @Test
    @Transactional
    void createAcaoWithExistingId() throws Exception {
        // Create the Acao with an existing ID
        acao.setId(1L);

        int databaseSizeBeforeCreate = acaoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAcaoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(acao)))
            .andExpect(status().isBadRequest());

        // Validate the Acao in the database
        List<Acao> acaoList = acaoRepository.findAll();
        assertThat(acaoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = acaoRepository.findAll().size();
        // set the field null
        acao.setNome(null);

        // Create the Acao, which fails.

        restAcaoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(acao)))
            .andExpect(status().isBadRequest());

        List<Acao> acaoList = acaoRepository.findAll();
        assertThat(acaoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllAcaos() throws Exception {
        // Initialize the database
        acaoRepository.saveAndFlush(acao);

        // Get all the acaoList
        restAcaoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(acao.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].obs").value(hasItem(DEFAULT_OBS)));
    }

    @Test
    @Transactional
    void getAcao() throws Exception {
        // Initialize the database
        acaoRepository.saveAndFlush(acao);

        // Get the acao
        restAcaoMockMvc
            .perform(get(ENTITY_API_URL_ID, acao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(acao.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.obs").value(DEFAULT_OBS));
    }

    @Test
    @Transactional
    void getNonExistingAcao() throws Exception {
        // Get the acao
        restAcaoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingAcao() throws Exception {
        // Initialize the database
        acaoRepository.saveAndFlush(acao);

        int databaseSizeBeforeUpdate = acaoRepository.findAll().size();

        // Update the acao
        Acao updatedAcao = acaoRepository.findById(acao.getId()).get();
        // Disconnect from session so that the updates on updatedAcao are not directly saved in db
        em.detach(updatedAcao);
        updatedAcao.nome(UPDATED_NOME).obs(UPDATED_OBS);

        restAcaoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedAcao.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedAcao))
            )
            .andExpect(status().isOk());

        // Validate the Acao in the database
        List<Acao> acaoList = acaoRepository.findAll();
        assertThat(acaoList).hasSize(databaseSizeBeforeUpdate);
        Acao testAcao = acaoList.get(acaoList.size() - 1);
        assertThat(testAcao.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testAcao.getObs()).isEqualTo(UPDATED_OBS);
    }

    @Test
    @Transactional
    void putNonExistingAcao() throws Exception {
        int databaseSizeBeforeUpdate = acaoRepository.findAll().size();
        acao.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAcaoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, acao.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(acao))
            )
            .andExpect(status().isBadRequest());

        // Validate the Acao in the database
        List<Acao> acaoList = acaoRepository.findAll();
        assertThat(acaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchAcao() throws Exception {
        int databaseSizeBeforeUpdate = acaoRepository.findAll().size();
        acao.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAcaoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(acao))
            )
            .andExpect(status().isBadRequest());

        // Validate the Acao in the database
        List<Acao> acaoList = acaoRepository.findAll();
        assertThat(acaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAcao() throws Exception {
        int databaseSizeBeforeUpdate = acaoRepository.findAll().size();
        acao.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAcaoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(acao)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Acao in the database
        List<Acao> acaoList = acaoRepository.findAll();
        assertThat(acaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateAcaoWithPatch() throws Exception {
        // Initialize the database
        acaoRepository.saveAndFlush(acao);

        int databaseSizeBeforeUpdate = acaoRepository.findAll().size();

        // Update the acao using partial update
        Acao partialUpdatedAcao = new Acao();
        partialUpdatedAcao.setId(acao.getId());

        partialUpdatedAcao.nome(UPDATED_NOME);

        restAcaoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAcao.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAcao))
            )
            .andExpect(status().isOk());

        // Validate the Acao in the database
        List<Acao> acaoList = acaoRepository.findAll();
        assertThat(acaoList).hasSize(databaseSizeBeforeUpdate);
        Acao testAcao = acaoList.get(acaoList.size() - 1);
        assertThat(testAcao.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testAcao.getObs()).isEqualTo(DEFAULT_OBS);
    }

    @Test
    @Transactional
    void fullUpdateAcaoWithPatch() throws Exception {
        // Initialize the database
        acaoRepository.saveAndFlush(acao);

        int databaseSizeBeforeUpdate = acaoRepository.findAll().size();

        // Update the acao using partial update
        Acao partialUpdatedAcao = new Acao();
        partialUpdatedAcao.setId(acao.getId());

        partialUpdatedAcao.nome(UPDATED_NOME).obs(UPDATED_OBS);

        restAcaoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAcao.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAcao))
            )
            .andExpect(status().isOk());

        // Validate the Acao in the database
        List<Acao> acaoList = acaoRepository.findAll();
        assertThat(acaoList).hasSize(databaseSizeBeforeUpdate);
        Acao testAcao = acaoList.get(acaoList.size() - 1);
        assertThat(testAcao.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testAcao.getObs()).isEqualTo(UPDATED_OBS);
    }

    @Test
    @Transactional
    void patchNonExistingAcao() throws Exception {
        int databaseSizeBeforeUpdate = acaoRepository.findAll().size();
        acao.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAcaoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, acao.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(acao))
            )
            .andExpect(status().isBadRequest());

        // Validate the Acao in the database
        List<Acao> acaoList = acaoRepository.findAll();
        assertThat(acaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAcao() throws Exception {
        int databaseSizeBeforeUpdate = acaoRepository.findAll().size();
        acao.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAcaoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(acao))
            )
            .andExpect(status().isBadRequest());

        // Validate the Acao in the database
        List<Acao> acaoList = acaoRepository.findAll();
        assertThat(acaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAcao() throws Exception {
        int databaseSizeBeforeUpdate = acaoRepository.findAll().size();
        acao.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAcaoMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(acao)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Acao in the database
        List<Acao> acaoList = acaoRepository.findAll();
        assertThat(acaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteAcao() throws Exception {
        // Initialize the database
        acaoRepository.saveAndFlush(acao);

        int databaseSizeBeforeDelete = acaoRepository.findAll().size();

        // Delete the acao
        restAcaoMockMvc
            .perform(delete(ENTITY_API_URL_ID, acao.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Acao> acaoList = acaoRepository.findAll();
        assertThat(acaoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
