package br.com.jhisolution.user.hunters.web.rest.dto;

import br.com.jhisolution.user.hunters.domain.Decisao;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

public class DecisaoDTO {

    private Long id;
    private String nome;
    private String obs;
    private List<VotoSimDecisaoDTO> votoSims = new ArrayList<>();
    private List<VotoNaoDecisaoDTO> votoNaos = new ArrayList<>();

    public DecisaoDTO() {
        super();
        // TODO Auto-generated constructor stub
    }

    public DecisaoDTO(Long id, String nome, String obs) {
        super();
        this.id = id;
        this.nome = nome;
        this.obs = obs;
    }

    public DecisaoDTO(Long id, String nome, String obs, List<VotoSimDecisaoDTO> votoSims, List<VotoNaoDecisaoDTO> votoNaos) {
        super();
        this.id = id;
        this.nome = nome;
        this.obs = obs;
        this.votoSims = votoSims;
        this.votoNaos = votoNaos;
    }

    public static DecisaoDTO getInstance(Decisao decisao) {
        List<VotoSimDecisaoDTO> votoSims = Objects.nonNull(decisao.getVotoSims())
            ? decisao
                .getVotoSims()
                .stream()
                .map(obj -> VotoSimDecisaoDTO.getInstance(obj.getId(), obj.getNome(), obj.getObs()))
                .collect(Collectors.toList())
            : null;
        List<VotoNaoDecisaoDTO> votoNaos = Objects.nonNull(decisao.getVotoNaos())
            ? decisao
                .getVotoNaos()
                .stream()
                .map(obj -> VotoNaoDecisaoDTO.getInstance(obj.getId(), obj.getNome(), obj.getObs()))
                .collect(Collectors.toList())
            : null;
        return new DecisaoDTO(decisao.getId(), decisao.getNome(), decisao.getObs(), votoSims, votoNaos);
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

    public String getObs() {
        return obs;
    }

    public void setObs(String obs) {
        this.obs = obs;
    }

    public List<VotoSimDecisaoDTO> getVotoSims() {
        return votoSims;
    }

    public void setVotoSims(List<VotoSimDecisaoDTO> votoSims) {
        this.votoSims = votoSims;
    }

    public List<VotoNaoDecisaoDTO> getVotoNaos() {
        return votoNaos;
    }

    public void setVotoNaos(List<VotoNaoDecisaoDTO> votoNaos) {
        this.votoNaos = votoNaos;
    }
}
