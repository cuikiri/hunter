package br.com.jhisolution.user.hunters.domain;

import br.com.jhisolution.user.hunters.domain.enumeration.TipoReuniao;
import br.com.jhisolution.user.hunters.web.rest.dto.AcaoDTO;
import br.com.jhisolution.user.hunters.web.rest.dto.DecisaoDTO;
import br.com.jhisolution.user.hunters.web.rest.dto.ParticipanteDTO;
import br.com.jhisolution.user.hunters.web.rest.dto.PautaDTO;
import br.com.jhisolution.user.hunters.web.rest.dto.ReuniaoDTO;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Reuniao.
 */
@Entity
@Table(name = "reuniao")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Reuniao implements Serializable {

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

    @NotNull
    @Size(max = 1000)
    @Column(name = "descricao", length = 1000, nullable = false)
    private String descricao;

    @NotNull
    @Column(name = "data", nullable = false)
    private LocalDate data;

    @Column(name = "data_inicio")
    private LocalDate dataInicio;

    @Column(name = "data_fim")
    private LocalDate dataFim;

    @Size(max = 5)
    @Column(name = "hora_inicio", length = 5)
    private String horaInicio;

    @Size(max = 5)
    @Column(name = "hora_fim", length = 5)
    private String horaFim;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_reuniao")
    private TipoReuniao tipoReuniao;

    @Size(max = 100)
    @Column(name = "obs", length = 100)
    private String obs;

    @OneToMany(mappedBy = "reuniao")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "reuniao" })
    private Set<Pauta> pautas = new HashSet<>();

    @OneToMany(mappedBy = "reuniao")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "reuniao" }, allowSetters = true)
    private Set<Decisao> decisoes = new HashSet<>();

    @OneToMany(mappedBy = "reuniao")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "reuniao" }, allowSetters = true)
    private Set<Acao> acoes = new HashSet<>();

    @OneToMany(mappedBy = "reuniao")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "reuniao" }, allowSetters = true)
    private Set<Participante> participantes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Reuniao id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return this.nome;
    }

    public Reuniao nome(String nome) {
        this.setNome(nome);
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return this.descricao;
    }

    public Reuniao descricao(String descricao) {
        this.setDescricao(descricao);
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public LocalDate getData() {
        return this.data;
    }

    public Reuniao data(LocalDate data) {
        this.setData(data);
        return this;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public LocalDate getDataInicio() {
        return this.dataInicio;
    }

    public Reuniao dataInicio(LocalDate dataInicio) {
        this.setDataInicio(dataInicio);
        return this;
    }

    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }

    public LocalDate getDataFim() {
        return this.dataFim;
    }

    public Reuniao dataFim(LocalDate dataFim) {
        this.setDataFim(dataFim);
        return this;
    }

    public void setDataFim(LocalDate dataFim) {
        this.dataFim = dataFim;
    }

    public String getHoraInicio() {
        return this.horaInicio;
    }

    public Reuniao horaInicio(String horaInicio) {
        this.setHoraInicio(horaInicio);
        return this;
    }

    public void setHoraInicio(String horaInicio) {
        this.horaInicio = horaInicio;
    }

    public String getHoraFim() {
        return this.horaFim;
    }

    public Reuniao horaFim(String horaFim) {
        this.setHoraFim(horaFim);
        return this;
    }

    public void setHoraFim(String horaFim) {
        this.horaFim = horaFim;
    }

    public TipoReuniao getTipoReuniao() {
        return this.tipoReuniao;
    }

    public Reuniao tipoReuniao(TipoReuniao tipoReuniao) {
        this.setTipoReuniao(tipoReuniao);
        return this;
    }

    public void setTipoReuniao(TipoReuniao tipoReuniao) {
        this.tipoReuniao = tipoReuniao;
    }

    public String getObs() {
        return this.obs;
    }

    public Reuniao obs(String obs) {
        this.setObs(obs);
        return this;
    }

    public void setObs(String obs) {
        this.obs = obs;
    }

    public Set<Pauta> getPautas() {
        return this.pautas;
    }

    public void setPautas(Set<Pauta> pautas) {
        if (this.pautas != null) {
            this.pautas.forEach(i -> i.setReuniao(null));
        }
        if (pautas != null) {
            pautas.forEach(i -> i.setReuniao(this));
        }
        this.pautas = pautas;
    }

    public Reuniao pautas(Set<Pauta> pautas) {
        this.setPautas(pautas);
        return this;
    }

    public Reuniao addPautas(Pauta pauta) {
        this.pautas.add(pauta);
        pauta.setReuniao(this);
        return this;
    }

    public Reuniao removePautas(Pauta pauta) {
        this.pautas.remove(pauta);
        pauta.setReuniao(null);
        return this;
    }

    public Set<Decisao> getDecisoes() {
        return this.decisoes;
    }

    public void setDecisoes(Set<Decisao> decisaos) {
        if (this.decisoes != null) {
            this.decisoes.forEach(i -> i.setReuniao(null));
        }
        if (decisaos != null) {
            decisaos.forEach(i -> i.setReuniao(this));
        }
        this.decisoes = decisaos;
    }

    public Reuniao decisoes(Set<Decisao> decisaos) {
        this.setDecisoes(decisaos);
        return this;
    }

    public Reuniao addDecisoes(Decisao decisao) {
        this.decisoes.add(decisao);
        decisao.setReuniao(this);
        return this;
    }

    public Reuniao removeDecisoes(Decisao decisao) {
        this.decisoes.remove(decisao);
        decisao.setReuniao(null);
        return this;
    }

    public Set<Acao> getAcoes() {
        return this.acoes;
    }

    public void setAcoes(Set<Acao> acaos) {
        if (this.acoes != null) {
            this.acoes.forEach(i -> i.setReuniao(null));
        }
        if (acaos != null) {
            acaos.forEach(i -> i.setReuniao(this));
        }
        this.acoes = acaos;
    }

    public Reuniao acoes(Set<Acao> acaos) {
        this.setAcoes(acaos);
        return this;
    }

    public Reuniao addAcoes(Acao acao) {
        this.acoes.add(acao);
        acao.setReuniao(this);
        return this;
    }

    public Reuniao removeAcoes(Acao acao) {
        this.acoes.remove(acao);
        acao.setReuniao(null);
        return this;
    }

    public Set<Participante> getParticipantes() {
        return this.participantes;
    }

    public void setParticipantes(Set<Participante> participantes) {
        if (this.participantes != null) {
            this.participantes.forEach(i -> i.setReuniao(null));
        }
        if (participantes != null) {
            participantes.forEach(i -> i.setReuniao(this));
        }
        this.participantes = participantes;
    }

    public Reuniao participantes(Set<Participante> participantes) {
        this.setParticipantes(participantes);
        return this;
    }

    public Reuniao addParticipantes(Participante participante) {
        this.participantes.add(participante);
        participante.setReuniao(this);
        return this;
    }

    public Reuniao removeParticipantes(Participante participante) {
        this.participantes.remove(participante);
        participante.setReuniao(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Reuniao)) {
            return false;
        }
        return id != null && id.equals(((Reuniao) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Reuniao{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", data='" + getData() + "'" +
            ", dataInicio='" + getDataInicio() + "'" +
            ", dataFim='" + getDataFim() + "'" +
            ", horaInicio='" + getHoraInicio() + "'" +
            ", horaFim='" + getHoraFim() + "'" +
            ", tipoReuniao='" + getTipoReuniao() + "'" +
            ", obs='" + getObs() + "'" +
            "}";
    }

    public ReuniaoDTO toReuniaoDTO() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/YYY");
        return ReuniaoDTO.getInstance(
            getId(),
            getNome(),
            getDescricao(),
            Objects.nonNull(getData()) ? getData().format(formatter) : "",
            Objects.nonNull(getDataInicio()) ? getDataInicio().format(formatter) : "",
            Objects.nonNull(getDataFim()) ? getDataFim().format(formatter) : "",
            getHoraInicio(),
            getHoraFim(),
            getTipoReuniao().name(),
            getObs(),
            Objects.nonNull(getPautas())
                ? getPautas()
                    .stream()
                    .map(obj -> PautaDTO.getInstance(obj.getId(), obj.getNome(), obj.getObs()))
                    .collect(Collectors.toList())
                : null,
            Objects.nonNull(getDecisoes())
                ? getDecisoes().stream().map(obj -> DecisaoDTO.getInstance(obj)).collect(Collectors.toList())
                : null,
            Objects.nonNull(getAcoes())
                ? getAcoes().stream().map(obj -> AcaoDTO.getInstance(obj.getId(), obj.getNome(), obj.getObs())).collect(Collectors.toList())
                : null,
            Objects.nonNull(getParticipantes())
                ? getParticipantes()
                    .stream()
                    .map(obj -> ParticipanteDTO.getInstance(obj.getId(), obj.getNome(), obj.getObs()))
                    .collect(Collectors.toList())
                : null
        );
    }
}
