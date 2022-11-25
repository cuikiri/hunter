package br.com.jhisolution.user.hunters.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.com.jhisolution.user.hunters.IntegrationTest;
import br.com.jhisolution.user.hunters.domain.VotoNaoDecisao;
import br.com.jhisolution.user.hunters.repository.VotoNaoDecisaoRepository;
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
 * Integration tests for the {@link VotoNaoDecisaoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class VotoNaoDecisaoResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_OBS = "AAAAAAAAAA";
    private static final String UPDATED_OBS = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/voto-nao-decisaos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private VotoNaoDecisaoRepository votoNaoDecisaoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restVotoNaoDecisaoMockMvc;

    private VotoNaoDecisao votoNaoDecisao;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VotoNaoDecisao createEntity(EntityManager em) {
        VotoNaoDecisao votoNaoDecisao = new VotoNaoDecisao().nome(DEFAULT_NOME).obs(DEFAULT_OBS);
        return votoNaoDecisao;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VotoNaoDecisao createUpdatedEntity(EntityManager em) {
        VotoNaoDecisao votoNaoDecisao = new VotoNaoDecisao().nome(UPDATED_NOME).obs(UPDATED_OBS);
        return votoNaoDecisao;
    }

    @BeforeEach
    public void initTest() {
        votoNaoDecisao = createEntity(em);
    }

    @Test
    @Transactional
    void createVotoNaoDecisao() throws Exception {
        int databaseSizeBeforeCreate = votoNaoDecisaoRepository.findAll().size();
        // Create the VotoNaoDecisao
        restVotoNaoDecisaoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(votoNaoDecisao))
            )
            .andExpect(status().isCreated());

        // Validate the VotoNaoDecisao in the database
        List<VotoNaoDecisao> votoNaoDecisaoList = votoNaoDecisaoRepository.findAll();
        assertThat(votoNaoDecisaoList).hasSize(databaseSizeBeforeCreate + 1);
        VotoNaoDecisao testVotoNaoDecisao = votoNaoDecisaoList.get(votoNaoDecisaoList.size() - 1);
        assertThat(testVotoNaoDecisao.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testVotoNaoDecisao.getObs()).isEqualTo(DEFAULT_OBS);
    }

    @Test
    @Transactional
    void createVotoNaoDecisaoWithExistingId() throws Exception {
        // Create the VotoNaoDecisao with an existing ID
        votoNaoDecisao.setId(1L);

        int databaseSizeBeforeCreate = votoNaoDecisaoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restVotoNaoDecisaoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(votoNaoDecisao))
            )
            .andExpect(status().isBadRequest());

        // Validate the VotoNaoDecisao in the database
        List<VotoNaoDecisao> votoNaoDecisaoList = votoNaoDecisaoRepository.findAll();
        assertThat(votoNaoDecisaoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = votoNaoDecisaoRepository.findAll().size();
        // set the field null
        votoNaoDecisao.setNome(null);

        // Create the VotoNaoDecisao, which fails.

        restVotoNaoDecisaoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(votoNaoDecisao))
            )
            .andExpect(status().isBadRequest());

        List<VotoNaoDecisao> votoNaoDecisaoList = votoNaoDecisaoRepository.findAll();
        assertThat(votoNaoDecisaoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllVotoNaoDecisaos() throws Exception {
        // Initialize the database
        votoNaoDecisaoRepository.saveAndFlush(votoNaoDecisao);

        // Get all the votoNaoDecisaoList
        restVotoNaoDecisaoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(votoNaoDecisao.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].obs").value(hasItem(DEFAULT_OBS)));
    }

    @Test
    @Transactional
    void getVotoNaoDecisao() throws Exception {
        // Initialize the database
        votoNaoDecisaoRepository.saveAndFlush(votoNaoDecisao);

        // Get the votoNaoDecisao
        restVotoNaoDecisaoMockMvc
            .perform(get(ENTITY_API_URL_ID, votoNaoDecisao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(votoNaoDecisao.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.obs").value(DEFAULT_OBS));
    }

    @Test
    @Transactional
    void getNonExistingVotoNaoDecisao() throws Exception {
        // Get the votoNaoDecisao
        restVotoNaoDecisaoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewVotoNaoDecisao() throws Exception {
        // Initialize the database
        votoNaoDecisaoRepository.saveAndFlush(votoNaoDecisao);

        int databaseSizeBeforeUpdate = votoNaoDecisaoRepository.findAll().size();

        // Update the votoNaoDecisao
        VotoNaoDecisao updatedVotoNaoDecisao = votoNaoDecisaoRepository.findById(votoNaoDecisao.getId()).get();
        // Disconnect from session so that the updates on updatedVotoNaoDecisao are not directly saved in db
        em.detach(updatedVotoNaoDecisao);
        updatedVotoNaoDecisao.nome(UPDATED_NOME).obs(UPDATED_OBS);

        restVotoNaoDecisaoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedVotoNaoDecisao.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedVotoNaoDecisao))
            )
            .andExpect(status().isOk());

        // Validate the VotoNaoDecisao in the database
        List<VotoNaoDecisao> votoNaoDecisaoList = votoNaoDecisaoRepository.findAll();
        assertThat(votoNaoDecisaoList).hasSize(databaseSizeBeforeUpdate);
        VotoNaoDecisao testVotoNaoDecisao = votoNaoDecisaoList.get(votoNaoDecisaoList.size() - 1);
        assertThat(testVotoNaoDecisao.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testVotoNaoDecisao.getObs()).isEqualTo(UPDATED_OBS);
    }

    @Test
    @Transactional
    void putNonExistingVotoNaoDecisao() throws Exception {
        int databaseSizeBeforeUpdate = votoNaoDecisaoRepository.findAll().size();
        votoNaoDecisao.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVotoNaoDecisaoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, votoNaoDecisao.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(votoNaoDecisao))
            )
            .andExpect(status().isBadRequest());

        // Validate the VotoNaoDecisao in the database
        List<VotoNaoDecisao> votoNaoDecisaoList = votoNaoDecisaoRepository.findAll();
        assertThat(votoNaoDecisaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchVotoNaoDecisao() throws Exception {
        int databaseSizeBeforeUpdate = votoNaoDecisaoRepository.findAll().size();
        votoNaoDecisao.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVotoNaoDecisaoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(votoNaoDecisao))
            )
            .andExpect(status().isBadRequest());

        // Validate the VotoNaoDecisao in the database
        List<VotoNaoDecisao> votoNaoDecisaoList = votoNaoDecisaoRepository.findAll();
        assertThat(votoNaoDecisaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamVotoNaoDecisao() throws Exception {
        int databaseSizeBeforeUpdate = votoNaoDecisaoRepository.findAll().size();
        votoNaoDecisao.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVotoNaoDecisaoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(votoNaoDecisao)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the VotoNaoDecisao in the database
        List<VotoNaoDecisao> votoNaoDecisaoList = votoNaoDecisaoRepository.findAll();
        assertThat(votoNaoDecisaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateVotoNaoDecisaoWithPatch() throws Exception {
        // Initialize the database
        votoNaoDecisaoRepository.saveAndFlush(votoNaoDecisao);

        int databaseSizeBeforeUpdate = votoNaoDecisaoRepository.findAll().size();

        // Update the votoNaoDecisao using partial update
        VotoNaoDecisao partialUpdatedVotoNaoDecisao = new VotoNaoDecisao();
        partialUpdatedVotoNaoDecisao.setId(votoNaoDecisao.getId());

        partialUpdatedVotoNaoDecisao.obs(UPDATED_OBS);

        restVotoNaoDecisaoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedVotoNaoDecisao.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedVotoNaoDecisao))
            )
            .andExpect(status().isOk());

        // Validate the VotoNaoDecisao in the database
        List<VotoNaoDecisao> votoNaoDecisaoList = votoNaoDecisaoRepository.findAll();
        assertThat(votoNaoDecisaoList).hasSize(databaseSizeBeforeUpdate);
        VotoNaoDecisao testVotoNaoDecisao = votoNaoDecisaoList.get(votoNaoDecisaoList.size() - 1);
        assertThat(testVotoNaoDecisao.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testVotoNaoDecisao.getObs()).isEqualTo(UPDATED_OBS);
    }

    @Test
    @Transactional
    void fullUpdateVotoNaoDecisaoWithPatch() throws Exception {
        // Initialize the database
        votoNaoDecisaoRepository.saveAndFlush(votoNaoDecisao);

        int databaseSizeBeforeUpdate = votoNaoDecisaoRepository.findAll().size();

        // Update the votoNaoDecisao using partial update
        VotoNaoDecisao partialUpdatedVotoNaoDecisao = new VotoNaoDecisao();
        partialUpdatedVotoNaoDecisao.setId(votoNaoDecisao.getId());

        partialUpdatedVotoNaoDecisao.nome(UPDATED_NOME).obs(UPDATED_OBS);

        restVotoNaoDecisaoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedVotoNaoDecisao.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedVotoNaoDecisao))
            )
            .andExpect(status().isOk());

        // Validate the VotoNaoDecisao in the database
        List<VotoNaoDecisao> votoNaoDecisaoList = votoNaoDecisaoRepository.findAll();
        assertThat(votoNaoDecisaoList).hasSize(databaseSizeBeforeUpdate);
        VotoNaoDecisao testVotoNaoDecisao = votoNaoDecisaoList.get(votoNaoDecisaoList.size() - 1);
        assertThat(testVotoNaoDecisao.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testVotoNaoDecisao.getObs()).isEqualTo(UPDATED_OBS);
    }

    @Test
    @Transactional
    void patchNonExistingVotoNaoDecisao() throws Exception {
        int databaseSizeBeforeUpdate = votoNaoDecisaoRepository.findAll().size();
        votoNaoDecisao.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVotoNaoDecisaoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, votoNaoDecisao.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(votoNaoDecisao))
            )
            .andExpect(status().isBadRequest());

        // Validate the VotoNaoDecisao in the database
        List<VotoNaoDecisao> votoNaoDecisaoList = votoNaoDecisaoRepository.findAll();
        assertThat(votoNaoDecisaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchVotoNaoDecisao() throws Exception {
        int databaseSizeBeforeUpdate = votoNaoDecisaoRepository.findAll().size();
        votoNaoDecisao.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVotoNaoDecisaoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(votoNaoDecisao))
            )
            .andExpect(status().isBadRequest());

        // Validate the VotoNaoDecisao in the database
        List<VotoNaoDecisao> votoNaoDecisaoList = votoNaoDecisaoRepository.findAll();
        assertThat(votoNaoDecisaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamVotoNaoDecisao() throws Exception {
        int databaseSizeBeforeUpdate = votoNaoDecisaoRepository.findAll().size();
        votoNaoDecisao.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVotoNaoDecisaoMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(votoNaoDecisao))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the VotoNaoDecisao in the database
        List<VotoNaoDecisao> votoNaoDecisaoList = votoNaoDecisaoRepository.findAll();
        assertThat(votoNaoDecisaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteVotoNaoDecisao() throws Exception {
        // Initialize the database
        votoNaoDecisaoRepository.saveAndFlush(votoNaoDecisao);

        int databaseSizeBeforeDelete = votoNaoDecisaoRepository.findAll().size();

        // Delete the votoNaoDecisao
        restVotoNaoDecisaoMockMvc
            .perform(delete(ENTITY_API_URL_ID, votoNaoDecisao.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<VotoNaoDecisao> votoNaoDecisaoList = votoNaoDecisaoRepository.findAll();
        assertThat(votoNaoDecisaoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
