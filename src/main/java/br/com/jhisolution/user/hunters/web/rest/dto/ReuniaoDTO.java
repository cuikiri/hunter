package br.com.jhisolution.user.hunters.web.rest.dto;

import java.util.ArrayList;
import java.util.List;

public class ReuniaoDTO {

    private Long id;
    private String nome;
    private String descricao;
    private String data;
    private String dataInicio;
    private String dataFim;
    private String horaInicio;
    private String horaFim;
    private String tipoReuniao;
    private String obs;

    private List<PautaDTO> pautas = new ArrayList<>();
    private List<DecisaoDTO> decisoes = new ArrayList<>();
    private List<AcaoDTO> acoes = new ArrayList<>();
    private List<ParticipanteDTO> participantes = new ArrayList<>();

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
        String tipoReuniao,
        String obs,
        List<PautaDTO> pautas,
        List<DecisaoDTO> decisoes,
        List<AcaoDTO> acoes,
        List<ParticipanteDTO> participantes
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
        String tipoReuniao,
        String obs,
        List<PautaDTO> pautas,
        List<DecisaoDTO> decisoes,
        List<AcaoDTO> acoes,
        List<ParticipanteDTO> participantes
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

    public String getTipoReuniao() {
        return tipoReuniao;
    }

    public void setTipoReuniao(String tipoReuniao) {
        this.tipoReuniao = tipoReuniao;
    }

    public String getObs() {
        return obs;
    }

    public void setObs(String obs) {
        this.obs = obs;
    }

    public List<PautaDTO> getPautas() {
        return pautas;
    }

    public void setPautas(List<PautaDTO> pautas) {
        this.pautas = pautas;
    }

    public List<DecisaoDTO> getDecisoes() {
        return decisoes;
    }

    public void setDecisoes(List<DecisaoDTO> decisoes) {
        this.decisoes = decisoes;
    }

    public List<AcaoDTO> getAcoes() {
        return acoes;
    }

    public void setAcoes(List<AcaoDTO> acoes) {
        this.acoes = acoes;
    }

    public List<ParticipanteDTO> getParticipantes() {
        return participantes;
    }

    public void setParticipantes(List<ParticipanteDTO> participantes) {
        this.participantes = participantes;
    }
}
