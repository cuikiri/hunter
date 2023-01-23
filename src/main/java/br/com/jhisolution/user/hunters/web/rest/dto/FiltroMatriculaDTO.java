package br.com.jhisolution.user.hunters.web.rest.dto;

public class FiltroMatriculaDTO {

    private String tipo;
    private Long idMatricula;

    /*
     * Tipo documanto
     * 0 - Autorização esporte
     * 1 - Autorização imagem
     * 2 - Questionário saúde
     * 3 - Regras projeto
     * 4 - Termo LGPD
     */
    private Integer tipoDocumento;

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Long getIdMatricula() {
        return idMatricula;
    }

    public void setIdMatricula(Long idMatricula) {
        this.idMatricula = idMatricula;
    }

    public Integer getTipoDocumento() {
        return tipoDocumento;
    }

    public void setTipoDocumento(Integer tipoDocumento) {
        this.tipoDocumento = tipoDocumento;
    }
}
