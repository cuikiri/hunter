package br.com.jhisolution.user.hunters.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.com.jhisolution.user.hunters.IntegrationTest;
import br.com.jhisolution.user.hunters.domain.VotoSimDecisao;
import br.com.jhisolution.user.hunters.repository.VotoSimDecisaoRepository;
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
 * Integration tests for the {@link VotoSimDecisaoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class VotoSimDecisaoResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_OBS = "AAAAAAAAAA";
    private static final String UPDATED_OBS = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/voto-sim-decisaos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private VotoSimDecisaoRepository votoSimDecisaoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restVotoSimDecisaoMockMvc;

    private VotoSimDecisao votoSimDecisao;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VotoSimDecisao createEntity(EntityManager em) {
        VotoSimDecisao votoSimDecisao = new VotoSimDecisao().nome(DEFAULT_NOME).obs(DEFAULT_OBS);
        return votoSimDecisao;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VotoSimDecisao createUpdatedEntity(EntityManager em) {
        VotoSimDecisao votoSimDecisao = new VotoSimDecisao().nome(UPDATED_NOME).obs(UPDATED_OBS);
        return votoSimDecisao;
    }

    @BeforeEach
    public void initTest() {
        votoSimDecisao = createEntity(em);
    }

    @Test
    @Transactional
    void createVotoSimDecisao() throws Exception {
        int databaseSizeBeforeCreate = votoSimDecisaoRepository.findAll().size();
        // Create the VotoSimDecisao
        restVotoSimDecisaoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(votoSimDecisao))
            )
            .andExpect(status().isCreated());

        // Validate the VotoSimDecisao in the database
        List<VotoSimDecisao> votoSimDecisaoList = votoSimDecisaoRepository.findAll();
        assertThat(votoSimDecisaoList).hasSize(databaseSizeBeforeCreate + 1);
        VotoSimDecisao testVotoSimDecisao = votoSimDecisaoList.get(votoSimDecisaoList.size() - 1);
        assertThat(testVotoSimDecisao.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testVotoSimDecisao.getObs()).isEqualTo(DEFAULT_OBS);
    }

    @Test
    @Transactional
    void createVotoSimDecisaoWithExistingId() throws Exception {
        // Create the VotoSimDecisao with an existing ID
        votoSimDecisao.setId(1L);

        int databaseSizeBeforeCreate = votoSimDecisaoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restVotoSimDecisaoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(votoSimDecisao))
            )
            .andExpect(status().isBadRequest());

        // Validate the VotoSimDecisao in the database
        List<VotoSimDecisao> votoSimDecisaoList = votoSimDecisaoRepository.findAll();
        assertThat(votoSimDecisaoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = votoSimDecisaoRepository.findAll().size();
        // set the field null
        votoSimDecisao.setNome(null);

        // Create the VotoSimDecisao, which fails.

        restVotoSimDecisaoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(votoSimDecisao))
            )
            .andExpect(status().isBadRequest());

        List<VotoSimDecisao> votoSimDecisaoList = votoSimDecisaoRepository.findAll();
        assertThat(votoSimDecisaoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllVotoSimDecisaos() throws Exception {
        // Initialize the database
        votoSimDecisaoRepository.saveAndFlush(votoSimDecisao);

        // Get all the votoSimDecisaoList
        restVotoSimDecisaoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(votoSimDecisao.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].obs").value(hasItem(DEFAULT_OBS)));
    }

    @Test
    @Transactional
    void getVotoSimDecisao() throws Exception {
        // Initialize the database
        votoSimDecisaoRepository.saveAndFlush(votoSimDecisao);

        // Get the votoSimDecisao
        restVotoSimDecisaoMockMvc
            .perform(get(ENTITY_API_URL_ID, votoSimDecisao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(votoSimDecisao.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.obs").value(DEFAULT_OBS));
    }

    @Test
    @Transactional
    void getNonExistingVotoSimDecisao() throws Exception {
        // Get the votoSimDecisao
        restVotoSimDecisaoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingVotoSimDecisao() throws Exception {
        // Initialize the database
        votoSimDecisaoRepository.saveAndFlush(votoSimDecisao);

        int databaseSizeBeforeUpdate = votoSimDecisaoRepository.findAll().size();

        // Update the votoSimDecisao
        VotoSimDecisao updatedVotoSimDecisao = votoSimDecisaoRepository.findById(votoSimDecisao.getId()).get();
        // Disconnect from session so that the updates on updatedVotoSimDecisao are not directly saved in db
        em.detach(updatedVotoSimDecisao);
        updatedVotoSimDecisao.nome(UPDATED_NOME).obs(UPDATED_OBS);

        restVotoSimDecisaoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedVotoSimDecisao.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedVotoSimDecisao))
            )
            .andExpect(status().isOk());

        // Validate the VotoSimDecisao in the database
        List<VotoSimDecisao> votoSimDecisaoList = votoSimDecisaoRepository.findAll();
        assertThat(votoSimDecisaoList).hasSize(databaseSizeBeforeUpdate);
        VotoSimDecisao testVotoSimDecisao = votoSimDecisaoList.get(votoSimDecisaoList.size() - 1);
        assertThat(testVotoSimDecisao.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testVotoSimDecisao.getObs()).isEqualTo(UPDATED_OBS);
    }

    @Test
    @Transactional
    void putNonExistingVotoSimDecisao() throws Exception {
        int databaseSizeBeforeUpdate = votoSimDecisaoRepository.findAll().size();
        votoSimDecisao.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVotoSimDecisaoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, votoSimDecisao.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(votoSimDecisao))
            )
            .andExpect(status().isBadRequest());

        // Validate the VotoSimDecisao in the database
        List<VotoSimDecisao> votoSimDecisaoList = votoSimDecisaoRepository.findAll();
        assertThat(votoSimDecisaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchVotoSimDecisao() throws Exception {
        int databaseSizeBeforeUpdate = votoSimDecisaoRepository.findAll().size();
        votoSimDecisao.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVotoSimDecisaoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(votoSimDecisao))
            )
            .andExpect(status().isBadRequest());

        // Validate the VotoSimDecisao in the database
        List<VotoSimDecisao> votoSimDecisaoList = votoSimDecisaoRepository.findAll();
        assertThat(votoSimDecisaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamVotoSimDecisao() throws Exception {
        int databaseSizeBeforeUpdate = votoSimDecisaoRepository.findAll().size();
        votoSimDecisao.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVotoSimDecisaoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(votoSimDecisao)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the VotoSimDecisao in the database
        List<VotoSimDecisao> votoSimDecisaoList = votoSimDecisaoRepository.findAll();
        assertThat(votoSimDecisaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateVotoSimDecisaoWithPatch() throws Exception {
        // Initialize the database
        votoSimDecisaoRepository.saveAndFlush(votoSimDecisao);

        int databaseSizeBeforeUpdate = votoSimDecisaoRepository.findAll().size();

        // Update the votoSimDecisao using partial update
        VotoSimDecisao partialUpdatedVotoSimDecisao = new VotoSimDecisao();
        partialUpdatedVotoSimDecisao.setId(votoSimDecisao.getId());

        partialUpdatedVotoSimDecisao.nome(UPDATED_NOME);

        restVotoSimDecisaoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedVotoSimDecisao.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedVotoSimDecisao))
            )
            .andExpect(status().isOk());

        // Validate the VotoSimDecisao in the database
        List<VotoSimDecisao> votoSimDecisaoList = votoSimDecisaoRepository.findAll();
        assertThat(votoSimDecisaoList).hasSize(databaseSizeBeforeUpdate);
        VotoSimDecisao testVotoSimDecisao = votoSimDecisaoList.get(votoSimDecisaoList.size() - 1);
        assertThat(testVotoSimDecisao.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testVotoSimDecisao.getObs()).isEqualTo(DEFAULT_OBS);
    }

    @Test
    @Transactional
    void fullUpdateVotoSimDecisaoWithPatch() throws Exception {
        // Initialize the database
        votoSimDecisaoRepository.saveAndFlush(votoSimDecisao);

        int databaseSizeBeforeUpdate = votoSimDecisaoRepository.findAll().size();

        // Update the votoSimDecisao using partial update
        VotoSimDecisao partialUpdatedVotoSimDecisao = new VotoSimDecisao();
        partialUpdatedVotoSimDecisao.setId(votoSimDecisao.getId());

        partialUpdatedVotoSimDecisao.nome(UPDATED_NOME).obs(UPDATED_OBS);

        restVotoSimDecisaoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedVotoSimDecisao.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedVotoSimDecisao))
            )
            .andExpect(status().isOk());

        // Validate the VotoSimDecisao in the database
        List<VotoSimDecisao> votoSimDecisaoList = votoSimDecisaoRepository.findAll();
        assertThat(votoSimDecisaoList).hasSize(databaseSizeBeforeUpdate);
        VotoSimDecisao testVotoSimDecisao = votoSimDecisaoList.get(votoSimDecisaoList.size() - 1);
        assertThat(testVotoSimDecisao.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testVotoSimDecisao.getObs()).isEqualTo(UPDATED_OBS);
    }

    @Test
    @Transactional
    void patchNonExistingVotoSimDecisao() throws Exception {
        int databaseSizeBeforeUpdate = votoSimDecisaoRepository.findAll().size();
        votoSimDecisao.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVotoSimDecisaoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, votoSimDecisao.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(votoSimDecisao))
            )
            .andExpect(status().isBadRequest());

        // Validate the VotoSimDecisao in the database
        List<VotoSimDecisao> votoSimDecisaoList = votoSimDecisaoRepository.findAll();
        assertThat(votoSimDecisaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchVotoSimDecisao() throws Exception {
        int databaseSizeBeforeUpdate = votoSimDecisaoRepository.findAll().size();
        votoSimDecisao.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVotoSimDecisaoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(votoSimDecisao))
            )
            .andExpect(status().isBadRequest());

        // Validate the VotoSimDecisao in the database
        List<VotoSimDecisao> votoSimDecisaoList = votoSimDecisaoRepository.findAll();
        assertThat(votoSimDecisaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamVotoSimDecisao() throws Exception {
        int databaseSizeBeforeUpdate = votoSimDecisaoRepository.findAll().size();
        votoSimDecisao.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVotoSimDecisaoMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(votoSimDecisao))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the VotoSimDecisao in the database
        List<VotoSimDecisao> votoSimDecisaoList = votoSimDecisaoRepository.findAll();
        assertThat(votoSimDecisaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteVotoSimDecisao() throws Exception {
        // Initialize the database
        votoSimDecisaoRepository.saveAndFlush(votoSimDecisao);

        int databaseSizeBeforeDelete = votoSimDecisaoRepository.findAll().size();

        // Delete the votoSimDecisao
        restVotoSimDecisaoMockMvc
            .perform(delete(ENTITY_API_URL_ID, votoSimDecisao.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<VotoSimDecisao> votoSimDecisaoList = votoSimDecisaoRepository.findAll();
        assertThat(votoSimDecisaoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
