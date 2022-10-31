package br.com.jhisolution.user.hunters.web.rest.dto;

public class FiltroReuniaoDTO {

    private String tipo;
    private Long idReuniao;

    public FiltroReuniaoDTO() {
        super();
        // TODO Auto-generated constructor stub
    }

    public FiltroReuniaoDTO(String tipo, Long idReuniao) {
        super();
        this.tipo = tipo;
        this.idReuniao = idReuniao;
    }

    public static FiltroReuniaoDTO getInstance(String tipo, Long idReuniao) {
        return new FiltroReuniaoDTO(tipo, idReuniao);
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Long getIdReuniao() {
        return idReuniao;
    }

    public void setIdReuniao(Long idReuniao) {
        this.idReuniao = idReuniao;
    }
}
