package br.com.jhisolution.user.hunters.web.rest.dto;

import br.com.jhisolution.user.hunters.domain.Acao;
import br.com.jhisolution.user.hunters.domain.Decisao;
import br.com.jhisolution.user.hunters.domain.Participante;
import br.com.jhisolution.user.hunters.domain.Pauta;
import br.com.jhisolution.user.hunters.domain.enumeration.TipoReuniao;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

public class ReuniaoDTO {

    private Long id;
    private String nome;
    private String descricao;
    private String data;
    private String dataInicio;
    private String dataFim;
    private String horaInicio;
    private String horaFim;
    private TipoReuniao tipoReuniao;
    private String obs;

    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "reuniao" })
    private Set<Pauta> pautas = new HashSet<>();

    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "reuniao" }, allowSetters = true)
    private Set<Decisao> decisoes = new HashSet<>();

    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "reuniao" }, allowSetters = true)
    private Set<Acao> acoes = new HashSet<>();

    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "reuniao" }, allowSetters = true)
    private Set<Participante> participantes = new HashSet<>();

    public ReuniaoDTO() {
        super();
        // TODO Auto-generated constructor stub
    }

    public ReuniaoDTO(
        Long id,
        String nome,
        String descricao,
        String data,
        String dataInicio,
        String dataFim,
        String horaInicio,
        String horaFim,
        TipoReuniao tipoReuniao,
        String obs,
        Set<Pauta> pautas,
        Set<Decisao> decisoes,
        Set<Acao> acoes,
        Set<Participante> participantes
    ) {
        super();
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.data = data;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.horaInicio = horaInicio;
        this.horaFim = horaFim;
        this.tipoReuniao = tipoReuniao;
        this.obs = obs;
        this.pautas = pautas;
        this.decisoes = decisoes;
        this.acoes = acoes;
        this.participantes = participantes;
    }

    public static ReuniaoDTO getInstance(
        Long id,
        String nome,
        String descricao,
        String data,
        String dataInicio,
        String dataFim,
        String horaInicio,
        String horaFim,
        TipoReuniao tipoReuniao,
        String obs,
        Set<Pauta> pautas,
        Set<Decisao> decisoes,
        Set<Acao> acoes,
        Set<Participante> participantes
    ) {
        return new ReuniaoDTO(
            id,
            nome,
            descricao,
            data,
            dataInicio,
            dataFim,
            horaInicio,
            horaFim,
            tipoReuniao,
            obs,
            pautas,
            decisoes,
            acoes,
            participantes
        );
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(String dataInicio) {
        this.dataInicio = dataInicio;
    }

    public String getDataFim() {
        return dataFim;
    }

    public void setDataFim(String dataFim) {
        this.dataFim = dataFim;
    }

    public String getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(String horaInicio) {
        this.horaInicio = horaInicio;
    }

    public String getHoraFim() {
        return horaFim;
    }

    public void setHoraFim(String horaFim) {
        this.horaFim = horaFim;
    }

    public TipoReuniao getTipoReuniao() {
        return tipoReuniao;
    }

    public void setTipoReuniao(TipoReuniao tipoReuniao) {
        this.tipoReuniao = tipoReuniao;
    }

    public String getObs() {
        return obs;
    }

    public void setObs(String obs) {
        this.obs = obs;
    }

    public Set<Pauta> getPautas() {
        return pautas;
    }

    public void setPautas(Set<Pauta> pautas) {
        this.pautas = pautas;
    }

    public Set<Decisao> getDecisoes() {
        return decisoes;
    }

    public void setDecisoes(Set<Decisao> decisoes) {
        this.decisoes = decisoes;
    }

    public Set<Acao> getAcoes() {
        return acoes;
    }

    public void setAcoes(Set<Acao> acoes) {
        this.acoes = acoes;
    }

    public Set<Participante> getParticipantes() {
        return participantes;
    }

    public void setParticipantes(Set<Participante> participantes) {
        this.participantes = participantes;
    }
}
