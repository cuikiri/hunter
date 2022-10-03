package br.com.jhisolution.user.hunters.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.com.jhisolution.user.hunters.IntegrationTest;
import br.com.jhisolution.user.hunters.domain.Doenca;
import br.com.jhisolution.user.hunters.repository.DoencaRepository;
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
 * Integration tests for the {@link DoencaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DoencaResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_SINTOMA = "AAAAAAAAAA";
    private static final String UPDATED_SINTOMA = "BBBBBBBBBB";

    private static final String DEFAULT_PRECAUCOES = "AAAAAAAAAA";
    private static final String UPDATED_PRECAUCOES = "BBBBBBBBBB";

    private static final String DEFAULT_SOCORRO = "AAAAAAAAAA";
    private static final String UPDATED_SOCORRO = "BBBBBBBBBB";

    private static final String DEFAULT_OBS = "AAAAAAAAAA";
    private static final String UPDATED_OBS = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/doencas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private DoencaRepository doencaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDoencaMockMvc;

    private Doenca doenca;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Doenca createEntity(EntityManager em) {
        Doenca doenca = new Doenca()
            .nome(DEFAULT_NOME)
            .sintoma(DEFAULT_SINTOMA)
            .precaucoes(DEFAULT_PRECAUCOES)
            .socorro(DEFAULT_SOCORRO)
            .obs(DEFAULT_OBS);
        return doenca;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Doenca createUpdatedEntity(EntityManager em) {
        Doenca doenca = new Doenca()
            .nome(UPDATED_NOME)
            .sintoma(UPDATED_SINTOMA)
            .precaucoes(UPDATED_PRECAUCOES)
            .socorro(UPDATED_SOCORRO)
            .obs(UPDATED_OBS);
        return doenca;
    }

    @BeforeEach
    public void initTest() {
        doenca = createEntity(em);
    }

    @Test
    @Transactional
    void createDoenca() throws Exception {
        int databaseSizeBeforeCreate = doencaRepository.findAll().size();
        // Create the Doenca
        restDoencaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(doenca)))
            .andExpect(status().isCreated());

        // Validate the Doenca in the database
        List<Doenca> doencaList = doencaRepository.findAll();
        assertThat(doencaList).hasSize(databaseSizeBeforeCreate + 1);
        Doenca testDoenca = doencaList.get(doencaList.size() - 1);
        assertThat(testDoenca.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testDoenca.getSintoma()).isEqualTo(DEFAULT_SINTOMA);
        assertThat(testDoenca.getPrecaucoes()).isEqualTo(DEFAULT_PRECAUCOES);
        assertThat(testDoenca.getSocorro()).isEqualTo(DEFAULT_SOCORRO);
        assertThat(testDoenca.getObs()).isEqualTo(DEFAULT_OBS);
    }

    @Test
    @Transactional
    void createDoencaWithExistingId() throws Exception {
        // Create the Doenca with an existing ID
        doenca.setId(1L);

        int databaseSizeBeforeCreate = doencaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDoencaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(doenca)))
            .andExpect(status().isBadRequest());

        // Validate the Doenca in the database
        List<Doenca> doencaList = doencaRepository.findAll();
        assertThat(doencaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = doencaRepository.findAll().size();
        // set the field null
        doenca.setNome(null);

        // Create the Doenca, which fails.

        restDoencaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(doenca)))
            .andExpect(status().isBadRequest());

        List<Doenca> doencaList = doencaRepository.findAll();
        assertThat(doencaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllDoencas() throws Exception {
        // Initialize the database
        doencaRepository.saveAndFlush(doenca);

        // Get all the doencaList
        restDoencaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(doenca.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].sintoma").value(hasItem(DEFAULT_SINTOMA)))
            .andExpect(jsonPath("$.[*].precaucoes").value(hasItem(DEFAULT_PRECAUCOES)))
            .andExpect(jsonPath("$.[*].socorro").value(hasItem(DEFAULT_SOCORRO)))
            .andExpect(jsonPath("$.[*].obs").value(hasItem(DEFAULT_OBS)));
    }

    @Test
    @Transactional
    void getDoenca() throws Exception {
        // Initialize the database
        doencaRepository.saveAndFlush(doenca);

        // Get the doenca
        restDoencaMockMvc
            .perform(get(ENTITY_API_URL_ID, doenca.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(doenca.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.sintoma").value(DEFAULT_SINTOMA))
            .andExpect(jsonPath("$.precaucoes").value(DEFAULT_PRECAUCOES))
            .andExpect(jsonPath("$.socorro").value(DEFAULT_SOCORRO))
            .andExpect(jsonPath("$.obs").value(DEFAULT_OBS));
    }

    @Test
    @Transactional
    void getNonExistingDoenca() throws Exception {
        // Get the doenca
        restDoencaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewDoenca() throws Exception {
        // Initialize the database
        doencaRepository.saveAndFlush(doenca);

        int databaseSizeBeforeUpdate = doencaRepository.findAll().size();

        // Update the doenca
        Doenca updatedDoenca = doencaRepository.findById(doenca.getId()).get();
        // Disconnect from session so that the updates on updatedDoenca are not directly saved in db
        em.detach(updatedDoenca);
        updatedDoenca.nome(UPDATED_NOME).sintoma(UPDATED_SINTOMA).precaucoes(UPDATED_PRECAUCOES).socorro(UPDATED_SOCORRO).obs(UPDATED_OBS);

        restDoencaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedDoenca.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedDoenca))
            )
            .andExpect(status().isOk());

        // Validate the Doenca in the database
        List<Doenca> doencaList = doencaRepository.findAll();
        assertThat(doencaList).hasSize(databaseSizeBeforeUpdate);
        Doenca testDoenca = doencaList.get(doencaList.size() - 1);
        assertThat(testDoenca.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testDoenca.getSintoma()).isEqualTo(UPDATED_SINTOMA);
        assertThat(testDoenca.getPrecaucoes()).isEqualTo(UPDATED_PRECAUCOES);
        assertThat(testDoenca.getSocorro()).isEqualTo(UPDATED_SOCORRO);
        assertThat(testDoenca.getObs()).isEqualTo(UPDATED_OBS);
    }

    @Test
    @Transactional
    void putNonExistingDoenca() throws Exception {
        int databaseSizeBeforeUpdate = doencaRepository.findAll().size();
        doenca.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDoencaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, doenca.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(doenca))
            )
            .andExpect(status().isBadRequest());

        // Validate the Doenca in the database
        List<Doenca> doencaList = doencaRepository.findAll();
        assertThat(doencaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDoenca() throws Exception {
        int databaseSizeBeforeUpdate = doencaRepository.findAll().size();
        doenca.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDoencaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(doenca))
            )
            .andExpect(status().isBadRequest());

        // Validate the Doenca in the database
        List<Doenca> doencaList = doencaRepository.findAll();
        assertThat(doencaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDoenca() throws Exception {
        int databaseSizeBeforeUpdate = doencaRepository.findAll().size();
        doenca.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDoencaMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(doenca)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Doenca in the database
        List<Doenca> doencaList = doencaRepository.findAll();
        assertThat(doencaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDoencaWithPatch() throws Exception {
        // Initialize the database
        doencaRepository.saveAndFlush(doenca);

        int databaseSizeBeforeUpdate = doencaRepository.findAll().size();

        // Update the doenca using partial update
        Doenca partialUpdatedDoenca = new Doenca();
        partialUpdatedDoenca.setId(doenca.getId());

        partialUpdatedDoenca.sintoma(UPDATED_SINTOMA).socorro(UPDATED_SOCORRO);

        restDoencaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDoenca.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDoenca))
            )
            .andExpect(status().isOk());

        // Validate the Doenca in the database
        List<Doenca> doencaList = doencaRepository.findAll();
        assertThat(doencaList).hasSize(databaseSizeBeforeUpdate);
        Doenca testDoenca = doencaList.get(doencaList.size() - 1);
        assertThat(testDoenca.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testDoenca.getSintoma()).isEqualTo(UPDATED_SINTOMA);
        assertThat(testDoenca.getPrecaucoes()).isEqualTo(DEFAULT_PRECAUCOES);
        assertThat(testDoenca.getSocorro()).isEqualTo(UPDATED_SOCORRO);
        assertThat(testDoenca.getObs()).isEqualTo(DEFAULT_OBS);
    }

    @Test
    @Transactional
    void fullUpdateDoencaWithPatch() throws Exception {
        // Initialize the database
        doencaRepository.saveAndFlush(doenca);

        int databaseSizeBeforeUpdate = doencaRepository.findAll().size();

        // Update the doenca using partial update
        Doenca partialUpdatedDoenca = new Doenca();
        partialUpdatedDoenca.setId(doenca.getId());

        partialUpdatedDoenca
            .nome(UPDATED_NOME)
            .sintoma(UPDATED_SINTOMA)
            .precaucoes(UPDATED_PRECAUCOES)
            .socorro(UPDATED_SOCORRO)
            .obs(UPDATED_OBS);

        restDoencaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDoenca.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDoenca))
            )
            .andExpect(status().isOk());

        // Validate the Doenca in the database
        List<Doenca> doencaList = doencaRepository.findAll();
        assertThat(doencaList).hasSize(databaseSizeBeforeUpdate);
        Doenca testDoenca = doencaList.get(doencaList.size() - 1);
        assertThat(testDoenca.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testDoenca.getSintoma()).isEqualTo(UPDATED_SINTOMA);
        assertThat(testDoenca.getPrecaucoes()).isEqualTo(UPDATED_PRECAUCOES);
        assertThat(testDoenca.getSocorro()).isEqualTo(UPDATED_SOCORRO);
        assertThat(testDoenca.getObs()).isEqualTo(UPDATED_OBS);
    }

    @Test
    @Transactional
    void patchNonExistingDoenca() throws Exception {
        int databaseSizeBeforeUpdate = doencaRepository.findAll().size();
        doenca.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDoencaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, doenca.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(doenca))
            )
            .andExpect(status().isBadRequest());

        // Validate the Doenca in the database
        List<Doenca> doencaList = doencaRepository.findAll();
        assertThat(doencaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDoenca() throws Exception {
        int databaseSizeBeforeUpdate = doencaRepository.findAll().size();
        doenca.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDoencaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(doenca))
            )
            .andExpect(status().isBadRequest());

        // Validate the Doenca in the database
        List<Doenca> doencaList = doencaRepository.findAll();
        assertThat(doencaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDoenca() throws Exception {
        int databaseSizeBeforeUpdate = doencaRepository.findAll().size();
        doenca.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDoencaMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(doenca)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Doenca in the database
        List<Doenca> doencaList = doencaRepository.findAll();
        assertThat(doencaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDoenca() throws Exception {
        // Initialize the database
        doencaRepository.saveAndFlush(doenca);

        int databaseSizeBeforeDelete = doencaRepository.findAll().size();

        // Delete the doenca
        restDoencaMockMvc
            .perform(delete(ENTITY_API_URL_ID, doenca.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Doenca> doencaList = doencaRepository.findAll();
        assertThat(doencaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
