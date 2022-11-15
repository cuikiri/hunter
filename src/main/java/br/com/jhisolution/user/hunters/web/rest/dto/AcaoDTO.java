package br.com.jhisolution.user.hunters.web.rest.dto;

public class AcaoDTO {

    private Long id;
    private String nome;
    private String obs;

    public AcaoDTO() {
        super();
        // TODO Auto-generated constructor stub
    }

    public AcaoDTO(Long id, String nome, String obs) {
        super();
        this.id = id;
        this.nome = nome;
        this.obs = obs;
    }

    public static AcaoDTO getInstance(Long id, String nome, String obs) {
        return new AcaoDTO(id, nome, obs);
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
