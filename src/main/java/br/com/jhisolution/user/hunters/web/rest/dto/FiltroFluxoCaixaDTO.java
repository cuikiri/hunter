package br.com.jhisolution.user.hunters.web.rest.dto;

import java.time.LocalDate;

public class FiltroFluxoCaixaDTO {

    private LocalDate dataInicio;
    private LocalDate dataFim;
    private String tipo;

    public FiltroFluxoCaixaDTO() {
        super();
        // TODO Auto-generated constructor stub
    }

    public FiltroFluxoCaixaDTO(LocalDate dataInicio, LocalDate dataFim, String tipo) {
        super();
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.tipo = tipo;
    }

    public static FiltroFluxoCaixaDTO getInstance(LocalDate dataInicio, LocalDate dataFim, String tipo) {
        return new FiltroFluxoCaixaDTO(dataInicio, dataFim, tipo);
    }

    public LocalDate getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }

    public LocalDate getDataFim() {
        return dataFim;
    }

    public void setDataFim(LocalDate dataFim) {
        this.dataFim = dataFim;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
}
