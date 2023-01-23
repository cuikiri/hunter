package br.com.jhisolution.user.hunters.service.dto;

import java.time.LocalDate;
import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class MatriculaDTO {

    private Long id;
    private LocalDate data;
    private String responsavel;
    private String rg;
    private String cpf;
    private String pessoa;

    public MatriculaDTO() {
        super();
    }

    public MatriculaDTO(Long id, LocalDate data, String responsavel, String rg, String cpf, String pessoa) {
        super();
        this.id = id;
        this.data = data;
        this.responsavel = responsavel;
        this.rg = rg;
        this.cpf = cpf;
        this.pessoa = pessoa;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public String getResponsavel() {
        return responsavel;
    }

    public void setResponsavel(String responsavel) {
        this.responsavel = responsavel;
    }

    public String getRg() {
        return rg;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getPessoa() {
        return pessoa;
    }

    public void setPessoa(String pessoa) {
        this.pessoa = pessoa;
    }
}
