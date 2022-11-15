package br.com.jhisolution.user.hunters.web.rest.dto;

public class VotoSimDecisaoDTO {

    private Long id;
    private String nome;
    private String obs;

    public VotoSimDecisaoDTO() {
        super();
        // TODO Auto-generated constructor stub
    }

    public VotoSimDecisaoDTO(Long id, String nome, String obs) {
        super();
        this.id = id;
        this.nome = nome;
        this.obs = obs;
    }

    public static VotoSimDecisaoDTO getInstance(Long id, String nome, String obs) {
        return new VotoSimDecisaoDTO(id, nome, obs);
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
}
