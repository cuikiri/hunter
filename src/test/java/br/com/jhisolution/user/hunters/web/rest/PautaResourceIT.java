package br.com.jhisolution.user.hunters.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.com.jhisolution.user.hunters.IntegrationTest;
import br.com.jhisolution.user.hunters.domain.Pauta;
import br.com.jhisolution.user.hunters.repository.PautaRepository;
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
 * Integration tests for the {@link PautaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PautaResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_OBS = "AAAAAAAAAA";
    private static final String UPDATED_OBS = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/pautas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PautaRepository pautaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPautaMockMvc;

    private Pauta pauta;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pauta createEntity(EntityManager em) {
        Pauta pauta = new Pauta().nome(DEFAULT_NOME).obs(DEFAULT_OBS);
        return pauta;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pauta createUpdatedEntity(EntityManager em) {
        Pauta pauta = new Pauta().nome(UPDATED_NOME).obs(UPDATED_OBS);
        return pauta;
    }

    @BeforeEach
    public void initTest() {
        pauta = createEntity(em);
    }

    @Test
    @Transactional
    void createPauta() throws Exception {
        int databaseSizeBeforeCreate = pautaRepository.findAll().size();
        // Create the Pauta
        restPautaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pauta)))
            .andExpect(status().isCreated());

        // Validate the Pauta in the database
        List<Pauta> pautaList = pautaRepository.findAll();
        assertThat(pautaList).hasSize(databaseSizeBeforeCreate + 1);
        Pauta testPauta = pautaList.get(pautaList.size() - 1);
        assertThat(testPauta.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testPauta.getObs()).isEqualTo(DEFAULT_OBS);
    }

    @Test
    @Transactional
    void createPautaWithExistingId() throws Exception {
        // Create the Pauta with an existing ID
        pauta.setId(1L);

        int databaseSizeBeforeCreate = pautaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPautaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pauta)))
            .andExpect(status().isBadRequest());

        // Validate the Pauta in the database
        List<Pauta> pautaList = pautaRepository.findAll();
        assertThat(pautaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = pautaRepository.findAll().size();
        // set the field null
        pauta.setNome(null);

        // Create the Pauta, which fails.

        restPautaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pauta)))
            .andExpect(status().isBadRequest());

        List<Pauta> pautaList = pautaRepository.findAll();
        assertThat(pautaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllPautas() throws Exception {
        // Initialize the database
        pautaRepository.saveAndFlush(pauta);

        // Get all the pautaList
        restPautaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pauta.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].obs").value(hasItem(DEFAULT_OBS)));
    }

    @Test
    @Transactional
    void getPauta() throws Exception {
        // Initialize the database
        pautaRepository.saveAndFlush(pauta);

        // Get the pauta
        restPautaMockMvc
            .perform(get(ENTITY_API_URL_ID, pauta.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(pauta.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.obs").value(DEFAULT_OBS));
    }

    @Test
    @Transactional
    void getNonExistingPauta() throws Exception {
        // Get the pauta
        restPautaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewPauta() throws Exception {
        // Initialize the database
        pautaRepository.saveAndFlush(pauta);

        int databaseSizeBeforeUpdate = pautaRepository.findAll().size();

        // Update the pauta
        Pauta updatedPauta = pautaRepository.findById(pauta.getId()).get();
        // Disconnect from session so that the updates on updatedPauta are not directly saved in db
        em.detach(updatedPauta);
        updatedPauta.nome(UPDATED_NOME).obs(UPDATED_OBS);

        restPautaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPauta.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPauta))
            )
            .andExpect(status().isOk());

        // Validate the Pauta in the database
        List<Pauta> pautaList = pautaRepository.findAll();
        assertThat(pautaList).hasSize(databaseSizeBeforeUpdate);
        Pauta testPauta = pautaList.get(pautaList.size() - 1);
        assertThat(testPauta.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testPauta.getObs()).isEqualTo(UPDATED_OBS);
    }

    @Test
    @Transactional
    void putNonExistingPauta() throws Exception {
        int databaseSizeBeforeUpdate = pautaRepository.findAll().size();
        pauta.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPautaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, pauta.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(pauta))
            )
            .andExpect(status().isBadRequest());

        // Validate the Pauta in the database
        List<Pauta> pautaList = pautaRepository.findAll();
        assertThat(pautaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPauta() throws Exception {
        int databaseSizeBeforeUpdate = pautaRepository.findAll().size();
        pauta.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPautaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(pauta))
            )
            .andExpect(status().isBadRequest());

        // Validate the Pauta in the database
        List<Pauta> pautaList = pautaRepository.findAll();
        assertThat(pautaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPauta() throws Exception {
        int databaseSizeBeforeUpdate = pautaRepository.findAll().size();
        pauta.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPautaMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pauta)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Pauta in the database
        List<Pauta> pautaList = pautaRepository.findAll();
        assertThat(pautaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePautaWithPatch() throws Exception {
        // Initialize the database
        pautaRepository.saveAndFlush(pauta);

        int databaseSizeBeforeUpdate = pautaRepository.findAll().size();

        // Update the pauta using partial update
        Pauta partialUpdatedPauta = new Pauta();
        partialUpdatedPauta.setId(pauta.getId());

        partialUpdatedPauta.nome(UPDATED_NOME);

        restPautaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPauta.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPauta))
            )
            .andExpect(status().isOk());

        // Validate the Pauta in the database
        List<Pauta> pautaList = pautaRepository.findAll();
        assertThat(pautaList).hasSize(databaseSizeBeforeUpdate);
        Pauta testPauta = pautaList.get(pautaList.size() - 1);
        assertThat(testPauta.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testPauta.getObs()).isEqualTo(DEFAULT_OBS);
    }

    @Test
    @Transactional
    void fullUpdatePautaWithPatch() throws Exception {
        // Initialize the database
        pautaRepository.saveAndFlush(pauta);

        int databaseSizeBeforeUpdate = pautaRepository.findAll().size();

        // Update the pauta using partial update
        Pauta partialUpdatedPauta = new Pauta();
        partialUpdatedPauta.setId(pauta.getId());

        partialUpdatedPauta.nome(UPDATED_NOME).obs(UPDATED_OBS);

        restPautaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPauta.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPauta))
            )
            .andExpect(status().isOk());

        // Validate the Pauta in the database
        List<Pauta> pautaList = pautaRepository.findAll();
        assertThat(pautaList).hasSize(databaseSizeBeforeUpdate);
        Pauta testPauta = pautaList.get(pautaList.size() - 1);
        assertThat(testPauta.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testPauta.getObs()).isEqualTo(UPDATED_OBS);
    }

    @Test
    @Transactional
    void patchNonExistingPauta() throws Exception {
        int databaseSizeBeforeUpdate = pautaRepository.findAll().size();
        pauta.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPautaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, pauta.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(pauta))
            )
            .andExpect(status().isBadRequest());

        // Validate the Pauta in the database
        List<Pauta> pautaList = pautaRepository.findAll();
        assertThat(pautaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPauta() throws Exception {
        int databaseSizeBeforeUpdate = pautaRepository.findAll().size();
        pauta.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPautaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(pauta))
            )
            .andExpect(status().isBadRequest());

        // Validate the Pauta in the database
        List<Pauta> pautaList = pautaRepository.findAll();
        assertThat(pautaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPauta() throws Exception {
        int databaseSizeBeforeUpdate = pautaRepository.findAll().size();
        pauta.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPautaMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(pauta)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Pauta in the database
        List<Pauta> pautaList = pautaRepository.findAll();
        assertThat(pautaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePauta() throws Exception {
        // Initialize the database
        pautaRepository.saveAndFlush(pauta);

        int databaseSizeBeforeDelete = pautaRepository.findAll().size();

        // Delete the pauta
        restPautaMockMvc
            .perform(delete(ENTITY_API_URL_ID, pauta.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Pauta> pautaList = pautaRepository.findAll();
        assertThat(pautaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
