package br.com.jhisolution.user.hunters.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Endereco.
 */
@Entity
@Table(name = "endereco")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Endereco implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(min = 8, max = 10)
    @Column(name = "cep", length = 10, nullable = false)
    private String cep;

    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "logradouro", length = 50, nullable = false)
    private String logradouro;

    @Size(min = 1, max = 50)
    @Column(name = "complemento_1", length = 50, nullable = false)
    private String complemento1;

    @NotNull
    @Size(min = 1, max = 10)
    @Column(name = "numero", length = 10, nullable = false)
    private String numero;

    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "bairro", length = 50, nullable = false)
    private String bairro;

    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "localidade", length = 50, nullable = false)
    private String localidade;

    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "uf", length = 50, nullable = false)
    private String uf;

    @ManyToOne
    @JsonIgnoreProperties(
        value = {
            "tipoPessoa",
            "estadoCivil",
            "raca",
            "religiao",
            "foto",
            "fotoAvatar",
            "fotoIcon",
            "mensagems",
            "avisos",
            "documentos",
            "enderecos",
            "user",
        },
        allowSetters = true
    )
    private DadosPessoais dadosPessoais;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Endereco id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCep() {
        return this.cep;
    }

    public Endereco cep(String cep) {
        this.setCep(cep);
        return this;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getLogradouro() {
        return this.logradouro;
    }

    public Endereco logradouro(String logradouro) {
        this.setLogradouro(logradouro);
        return this;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public String getComplemento1() {
        return this.complemento1;
    }

    public Endereco complemento1(String complemento1) {
        this.setComplemento1(complemento1);
        return this;
    }

    public void setComplemento1(String complemento1) {
        this.complemento1 = complemento1;
    }

    public String getNumero() {
        return this.numero;
    }

    public Endereco numero(String numero) {
        this.setNumero(numero);
        return this;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getBairro() {
        return this.bairro;
    }

    public Endereco bairro(String bairro) {
        this.setBairro(bairro);
        return this;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getLocalidade() {
        return this.localidade;
    }

    public Endereco localidade(String localidade) {
        this.setLocalidade(localidade);
        return this;
    }

    public void setLocalidade(String localidade) {
        this.localidade = localidade;
    }

    public String getUf() {
        return this.uf;
    }

    public Endereco uf(String uf) {
        this.setUf(uf);
        return this;
    }

    public void setUf(String uf) {
        this.uf = uf;
    }

    public DadosPessoais getDadosPessoais() {
        return this.dadosPessoais;
    }

    public void setDadosPessoais(DadosPessoais dadosPessoais) {
        this.dadosPessoais = dadosPessoais;
    }

    public Endereco dadosPessoais(DadosPessoais dadosPessoais) {
        this.setDadosPessoais(dadosPessoais);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Endereco)) {
            return false;
        }
        return id != null && id.equals(((Endereco) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Endereco{" +
            "id=" + getId() +
            ", cep='" + getCep() + "'" +
            ", logradouro='" + getLogradouro() + "'" +
            ", complemento1='" + getComplemento1() + "'" +
            ", numero='" + getNumero() + "'" +
            ", bairro='" + getBairro() + "'" +
            ", localidade='" + getLocalidade() + "'" +
            ", uf='" + getUf() + "'" +
            "}";
    }
}
