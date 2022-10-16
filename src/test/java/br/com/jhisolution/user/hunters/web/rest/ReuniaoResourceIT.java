package br.com.jhisolution.user.hunters.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.com.jhisolution.user.hunters.IntegrationTest;
import br.com.jhisolution.user.hunters.domain.Reuniao;
import br.com.jhisolution.user.hunters.domain.enumeration.TipoReuniao;
import br.com.jhisolution.user.hunters.repository.ReuniaoRepository;
import java.time.LocalDate;
import java.time.ZoneId;
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
 * Integration tests for the {@link ReuniaoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ReuniaoResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATA_INICIO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_INICIO = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATA_FIM = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_FIM = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_HORA_INICIO = "AAAAA";
    private static final String UPDATED_HORA_INICIO = "BBBBB";

    private static final String DEFAULT_HORA_FIM = "AAAAA";
    private static final String UPDATED_HORA_FIM = "BBBBB";

    private static final TipoReuniao DEFAULT_TIPO_REUNIAO = TipoReuniao.DELIBERATIVA;
    private static final TipoReuniao UPDATED_TIPO_REUNIAO = TipoReuniao.INFORMATIVA;

    private static final String DEFAULT_OBS = "AAAAAAAAAA";
    private static final String UPDATED_OBS = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/reuniaos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ReuniaoRepository reuniaoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restReuniaoMockMvc;

    private Reuniao reuniao;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Reuniao createEntity(EntityManager em) {
        Reuniao reuniao = new Reuniao()
            .nome(DEFAULT_NOME)
            .descricao(DEFAULT_DESCRICAO)
            .data(DEFAULT_DATA)
            .dataInicio(DEFAULT_DATA_INICIO)
            .dataFim(DEFAULT_DATA_FIM)
            .horaInicio(DEFAULT_HORA_INICIO)
            .horaFim(DEFAULT_HORA_FIM)
            .tipoReuniao(DEFAULT_TIPO_REUNIAO)
            .obs(DEFAULT_OBS);
        return reuniao;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Reuniao createUpdatedEntity(EntityManager em) {
        Reuniao reuniao = new Reuniao()
            .nome(UPDATED_NOME)
            .descricao(UPDATED_DESCRICAO)
            .data(UPDATED_DATA)
            .dataInicio(UPDATED_DATA_INICIO)
            .dataFim(UPDATED_DATA_FIM)
            .horaInicio(UPDATED_HORA_INICIO)
            .horaFim(UPDATED_HORA_FIM)
            .tipoReuniao(UPDATED_TIPO_REUNIAO)
            .obs(UPDATED_OBS);
        return reuniao;
    }

    @BeforeEach
    public void initTest() {
        reuniao = createEntity(em);
    }

    @Test
    @Transactional
    void createReuniao() throws Exception {
        int databaseSizeBeforeCreate = reuniaoRepository.findAll().size();
        // Create the Reuniao
        restReuniaoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(reuniao)))
            .andExpect(status().isCreated());

        // Validate the Reuniao in the database
        List<Reuniao> reuniaoList = reuniaoRepository.findAll();
        assertThat(reuniaoList).hasSize(databaseSizeBeforeCreate + 1);
        Reuniao testReuniao = reuniaoList.get(reuniaoList.size() - 1);
        assertThat(testReuniao.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testReuniao.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testReuniao.getData()).isEqualTo(DEFAULT_DATA);
        assertThat(testReuniao.getDataInicio()).isEqualTo(DEFAULT_DATA_INICIO);
        assertThat(testReuniao.getDataFim()).isEqualTo(DEFAULT_DATA_FIM);
        assertThat(testReuniao.getHoraInicio()).isEqualTo(DEFAULT_HORA_INICIO);
        assertThat(testReuniao.getHoraFim()).isEqualTo(DEFAULT_HORA_FIM);
        assertThat(testReuniao.getTipoReuniao()).isEqualTo(DEFAULT_TIPO_REUNIAO);
        assertThat(testReuniao.getObs()).isEqualTo(DEFAULT_OBS);
    }

    @Test
    @Transactional
    void createReuniaoWithExistingId() throws Exception {
        // Create the Reuniao with an existing ID
        reuniao.setId(1L);

        int databaseSizeBeforeCreate = reuniaoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restReuniaoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(reuniao)))
            .andExpect(status().isBadRequest());

        // Validate the Reuniao in the database
        List<Reuniao> reuniaoList = reuniaoRepository.findAll();
        assertThat(reuniaoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = reuniaoRepository.findAll().size();
        // set the field null
        reuniao.setNome(null);

        // Create the Reuniao, which fails.

        restReuniaoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(reuniao)))
            .andExpect(status().isBadRequest());

        List<Reuniao> reuniaoList = reuniaoRepository.findAll();
        assertThat(reuniaoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDescricaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = reuniaoRepository.findAll().size();
        // set the field null
        reuniao.setDescricao(null);

        // Create the Reuniao, which fails.

        restReuniaoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(reuniao)))
            .andExpect(status().isBadRequest());

        List<Reuniao> reuniaoList = reuniaoRepository.findAll();
        assertThat(reuniaoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDataIsRequired() throws Exception {
        int databaseSizeBeforeTest = reuniaoRepository.findAll().size();
        // set the field null
        reuniao.setData(null);

        // Create the Reuniao, which fails.

        restReuniaoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(reuniao)))
            .andExpect(status().isBadRequest());

        List<Reuniao> reuniaoList = reuniaoRepository.findAll();
        assertThat(reuniaoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllReuniaos() throws Exception {
        // Initialize the database
        reuniaoRepository.saveAndFlush(reuniao);

        // Get all the reuniaoList
        restReuniaoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reuniao.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)))
            .andExpect(jsonPath("$.[*].data").value(hasItem(DEFAULT_DATA.toString())))
            .andExpect(jsonPath("$.[*].dataInicio").value(hasItem(DEFAULT_DATA_INICIO.toString())))
            .andExpect(jsonPath("$.[*].dataFim").value(hasItem(DEFAULT_DATA_FIM.toString())))
            .andExpect(jsonPath("$.[*].horaInicio").value(hasItem(DEFAULT_HORA_INICIO)))
            .andExpect(jsonPath("$.[*].horaFim").value(hasItem(DEFAULT_HORA_FIM)))
            .andExpect(jsonPath("$.[*].tipoReuniao").value(hasItem(DEFAULT_TIPO_REUNIAO.toString())))
            .andExpect(jsonPath("$.[*].obs").value(hasItem(DEFAULT_OBS)));
    }

    @Test
    @Transactional
    void getReuniao() throws Exception {
        // Initialize the database
        reuniaoRepository.saveAndFlush(reuniao);

        // Get the reuniao
        restReuniaoMockMvc
            .perform(get(ENTITY_API_URL_ID, reuniao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(reuniao.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO))
            .andExpect(jsonPath("$.data").value(DEFAULT_DATA.toString()))
            .andExpect(jsonPath("$.dataInicio").value(DEFAULT_DATA_INICIO.toString()))
            .andExpect(jsonPath("$.dataFim").value(DEFAULT_DATA_FIM.toString()))
            .andExpect(jsonPath("$.horaInicio").value(DEFAULT_HORA_INICIO))
            .andExpect(jsonPath("$.horaFim").value(DEFAULT_HORA_FIM))
            .andExpect(jsonPath("$.tipoReuniao").value(DEFAULT_TIPO_REUNIAO.toString()))
            .andExpect(jsonPath("$.obs").value(DEFAULT_OBS));
    }

    @Test
    @Transactional
    void getNonExistingReuniao() throws Exception {
        // Get the reuniao
        restReuniaoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingReuniao() throws Exception {
        // Initialize the database
        reuniaoRepository.saveAndFlush(reuniao);

        int databaseSizeBeforeUpdate = reuniaoRepository.findAll().size();

        // Update the reuniao
        Reuniao updatedReuniao = reuniaoRepository.findById(reuniao.getId()).get();
        // Disconnect from session so that the updates on updatedReuniao are not directly saved in db
        em.detach(updatedReuniao);
        updatedReuniao
            .nome(UPDATED_NOME)
            .descricao(UPDATED_DESCRICAO)
            .data(UPDATED_DATA)
            .dataInicio(UPDATED_DATA_INICIO)
            .dataFim(UPDATED_DATA_FIM)
            .horaInicio(UPDATED_HORA_INICIO)
            .horaFim(UPDATED_HORA_FIM)
            .tipoReuniao(UPDATED_TIPO_REUNIAO)
            .obs(UPDATED_OBS);

        restReuniaoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedReuniao.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedReuniao))
            )
            .andExpect(status().isOk());

        // Validate the Reuniao in the database
        List<Reuniao> reuniaoList = reuniaoRepository.findAll();
        assertThat(reuniaoList).hasSize(databaseSizeBeforeUpdate);
        Reuniao testReuniao = reuniaoList.get(reuniaoList.size() - 1);
        assertThat(testReuniao.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testReuniao.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testReuniao.getData()).isEqualTo(UPDATED_DATA);
        assertThat(testReuniao.getDataInicio()).isEqualTo(UPDATED_DATA_INICIO);
        assertThat(testReuniao.getDataFim()).isEqualTo(UPDATED_DATA_FIM);
        assertThat(testReuniao.getHoraInicio()).isEqualTo(UPDATED_HORA_INICIO);
        assertThat(testReuniao.getHoraFim()).isEqualTo(UPDATED_HORA_FIM);
        assertThat(testReuniao.getTipoReuniao()).isEqualTo(UPDATED_TIPO_REUNIAO);
        assertThat(testReuniao.getObs()).isEqualTo(UPDATED_OBS);
    }

    @Test
    @Transactional
    void putNonExistingReuniao() throws Exception {
        int databaseSizeBeforeUpdate = reuniaoRepository.findAll().size();
        reuniao.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReuniaoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, reuniao.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(reuniao))
            )
            .andExpect(status().isBadRequest());

        // Validate the Reuniao in the database
        List<Reuniao> reuniaoList = reuniaoRepository.findAll();
        assertThat(reuniaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchReuniao() throws Exception {
        int databaseSizeBeforeUpdate = reuniaoRepository.findAll().size();
        reuniao.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReuniaoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(reuniao))
            )
            .andExpect(status().isBadRequest());

        // Validate the Reuniao in the database
        List<Reuniao> reuniaoList = reuniaoRepository.findAll();
        assertThat(reuniaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamReuniao() throws Exception {
        int databaseSizeBeforeUpdate = reuniaoRepository.findAll().size();
        reuniao.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReuniaoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(reuniao)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Reuniao in the database
        List<Reuniao> reuniaoList = reuniaoRepository.findAll();
        assertThat(reuniaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateReuniaoWithPatch() throws Exception {
        // Initialize the database
        reuniaoRepository.saveAndFlush(reuniao);

        int databaseSizeBeforeUpdate = reuniaoRepository.findAll().size();

        // Update the reuniao using partial update
        Reuniao partialUpdatedReuniao = new Reuniao();
        partialUpdatedReuniao.setId(reuniao.getId());

        partialUpdatedReuniao
            .nome(UPDATED_NOME)
            .data(UPDATED_DATA)
            .dataInicio(UPDATED_DATA_INICIO)
            .horaInicio(UPDATED_HORA_INICIO)
            .horaFim(UPDATED_HORA_FIM)
            .obs(UPDATED_OBS);

        restReuniaoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedReuniao.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedReuniao))
            )
            .andExpect(status().isOk());

        // Validate the Reuniao in the database
        List<Reuniao> reuniaoList = reuniaoRepository.findAll();
        assertThat(reuniaoList).hasSize(databaseSizeBeforeUpdate);
        Reuniao testReuniao = reuniaoList.get(reuniaoList.size() - 1);
        assertThat(testReuniao.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testReuniao.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testReuniao.getData()).isEqualTo(UPDATED_DATA);
        assertThat(testReuniao.getDataInicio()).isEqualTo(UPDATED_DATA_INICIO);
        assertThat(testReuniao.getDataFim()).isEqualTo(DEFAULT_DATA_FIM);
        assertThat(testReuniao.getHoraInicio()).isEqualTo(UPDATED_HORA_INICIO);
        assertThat(testReuniao.getHoraFim()).isEqualTo(UPDATED_HORA_FIM);
        assertThat(testReuniao.getTipoReuniao()).isEqualTo(DEFAULT_TIPO_REUNIAO);
        assertThat(testReuniao.getObs()).isEqualTo(UPDATED_OBS);
    }

    @Test
    @Transactional
    void fullUpdateReuniaoWithPatch() throws Exception {
        // Initialize the database
        reuniaoRepository.saveAndFlush(reuniao);

        int databaseSizeBeforeUpdate = reuniaoRepository.findAll().size();

        // Update the reuniao using partial update
        Reuniao partialUpdatedReuniao = new Reuniao();
        partialUpdatedReuniao.setId(reuniao.getId());

        partialUpdatedReuniao
            .nome(UPDATED_NOME)
            .descricao(UPDATED_DESCRICAO)
            .data(UPDATED_DATA)
            .dataInicio(UPDATED_DATA_INICIO)
            .dataFim(UPDATED_DATA_FIM)
            .horaInicio(UPDATED_HORA_INICIO)
            .horaFim(UPDATED_HORA_FIM)
            .tipoReuniao(UPDATED_TIPO_REUNIAO)
            .obs(UPDATED_OBS);

        restReuniaoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedReuniao.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedReuniao))
            )
            .andExpect(status().isOk());

        // Validate the Reuniao in the database
        List<Reuniao> reuniaoList = reuniaoRepository.findAll();
        assertThat(reuniaoList).hasSize(databaseSizeBeforeUpdate);
        Reuniao testReuniao = reuniaoList.get(reuniaoList.size() - 1);
        assertThat(testReuniao.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testReuniao.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testReuniao.getData()).isEqualTo(UPDATED_DATA);
        assertThat(testReuniao.getDataInicio()).isEqualTo(UPDATED_DATA_INICIO);
        assertThat(testReuniao.getDataFim()).isEqualTo(UPDATED_DATA_FIM);
        assertThat(testReuniao.getHoraInicio()).isEqualTo(UPDATED_HORA_INICIO);
        assertThat(testReuniao.getHoraFim()).isEqualTo(UPDATED_HORA_FIM);
        assertThat(testReuniao.getTipoReuniao()).isEqualTo(UPDATED_TIPO_REUNIAO);
        assertThat(testReuniao.getObs()).isEqualTo(UPDATED_OBS);
    }

    @Test
    @Transactional
    void patchNonExistingReuniao() throws Exception {
        int databaseSizeBeforeUpdate = reuniaoRepository.findAll().size();
        reuniao.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReuniaoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, reuniao.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(reuniao))
            )
            .andExpect(status().isBadRequest());

        // Validate the Reuniao in the database
        List<Reuniao> reuniaoList = reuniaoRepository.findAll();
        assertThat(reuniaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchReuniao() throws Exception {
        int databaseSizeBeforeUpdate = reuniaoRepository.findAll().size();
        reuniao.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReuniaoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(reuniao))
            )
            .andExpect(status().isBadRequest());

        // Validate the Reuniao in the database
        List<Reuniao> reuniaoList = reuniaoRepository.findAll();
        assertThat(reuniaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamReuniao() throws Exception {
        int databaseSizeBeforeUpdate = reuniaoRepository.findAll().size();
        reuniao.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReuniaoMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(reuniao)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Reuniao in the database
        List<Reuniao> reuniaoList = reuniaoRepository.findAll();
        assertThat(reuniaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteReuniao() throws Exception {
        // Initialize the database
        reuniaoRepository.saveAndFlush(reuniao);

        int databaseSizeBeforeDelete = reuniaoRepository.findAll().size();

        // Delete the reuniao
        restReuniaoMockMvc
            .perform(delete(ENTITY_API_URL_ID, reuniao.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Reuniao> reuniaoList = reuniaoRepository.findAll();
        assertThat(reuniaoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
