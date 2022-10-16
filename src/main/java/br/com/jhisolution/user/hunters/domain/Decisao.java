package br.com.jhisolution.user.hunters.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Decisao.
 */
@Entity
@Table(name = "decisao")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Decisao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 50)
    @Column(name = "nome", length = 50, nullable = false)
    private String nome;

    @Size(max = 100)
    @Column(name = "obs", length = 100)
    private String obs;

    @OneToMany(mappedBy = "decisao")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "decisao" }, allowSetters = true)
    private Set<VotoSimDecisao> votoSims = new HashSet<>();

    @OneToMany(mappedBy = "decisao")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "decisao" }, allowSetters = true)
    private Set<VotoNaoDecisao> votoNaos = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "pautas", "decisoes", "acoes", "participantes" }, allowSetters = true)
    private Reuniao reuniao;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Decisao id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return this.nome;
    }

    public Decisao nome(String nome) {
        this.setNome(nome);
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getObs() {
        return this.obs;
    }

    public Decisao obs(String obs) {
        this.setObs(obs);
        return this;
    }

    public void setObs(String obs) {
        this.obs = obs;
    }

    public Set<VotoSimDecisao> getVotoSims() {
        return this.votoSims;
    }

    public void setVotoSims(Set<VotoSimDecisao> votoSimDecisaos) {
        if (this.votoSims != null) {
            this.votoSims.forEach(i -> i.setDecisao(null));
        }
        if (votoSimDecisaos != null) {
            votoSimDecisaos.forEach(i -> i.setDecisao(this));
        }
        this.votoSims = votoSimDecisaos;
    }

    public Decisao votoSims(Set<VotoSimDecisao> votoSimDecisaos) {
        this.setVotoSims(votoSimDecisaos);
        return this;
    }

    public Decisao addVotoSim(VotoSimDecisao votoSimDecisao) {
        this.votoSims.add(votoSimDecisao);
        votoSimDecisao.setDecisao(this);
        return this;
    }

    public Decisao removeVotoSim(VotoSimDecisao votoSimDecisao) {
        this.votoSims.remove(votoSimDecisao);
        votoSimDecisao.setDecisao(null);
        return this;
    }

    public Set<VotoNaoDecisao> getVotoNaos() {
        return this.votoNaos;
    }

    public void setVotoNaos(Set<VotoNaoDecisao> votoNaoDecisaos) {
        if (this.votoNaos != null) {
            this.votoNaos.forEach(i -> i.setDecisao(null));
        }
        if (votoNaoDecisaos != null) {
            votoNaoDecisaos.forEach(i -> i.setDecisao(this));
        }
        this.votoNaos = votoNaoDecisaos;
    }

    public Decisao votoNaos(Set<VotoNaoDecisao> votoNaoDecisaos) {
        this.setVotoNaos(votoNaoDecisaos);
        return this;
    }

    public Decisao addVotoNao(VotoNaoDecisao votoNaoDecisao) {
        this.votoNaos.add(votoNaoDecisao);
        votoNaoDecisao.setDecisao(this);
        return this;
    }

    public Decisao removeVotoNao(VotoNaoDecisao votoNaoDecisao) {
        this.votoNaos.remove(votoNaoDecisao);
        votoNaoDecisao.setDecisao(null);
        return this;
    }

    public Reuniao getReuniao() {
        return this.reuniao;
    }

    public void setReuniao(Reuniao reuniao) {
        this.reuniao = reuniao;
    }

    public Decisao reuniao(Reuniao reuniao) {
        this.setReuniao(reuniao);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Decisao)) {
            return false;
        }
        return id != null && id.equals(((Decisao) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Decisao{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", obs='" + getObs() + "'" +
            "}";
    }
}
