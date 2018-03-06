package com.primerevenue.service.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A ChuckNorrisFacts.
 */
@Entity
@Table(name = "chuck_norris_facts")
public class ChuckNorrisFacts implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "fact")
    private String fact;

    @Column(name = "karatepower")
    private Integer karatepower;

    @Column(name = "created_at")
    private ZonedDateTime created_at;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFact() {
        return fact;
    }

    public ChuckNorrisFacts fact(String fact) {
        this.fact = fact;
        return this;
    }

    public void setFact(String fact) {
        this.fact = fact;
    }

    public Integer getKaratepower() {
        return karatepower;
    }

    public ChuckNorrisFacts karatepower(Integer karatepower) {
        this.karatepower = karatepower;
        return this;
    }

    public void setKaratepower(Integer karatepower) {
        this.karatepower = karatepower;
    }

    public ZonedDateTime getCreated_at() {
        return created_at;
    }

    public ChuckNorrisFacts created_at(ZonedDateTime created_at) {
        this.created_at = created_at;
        return this;
    }

    public void setCreated_at(ZonedDateTime created_at) {
        this.created_at = created_at;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ChuckNorrisFacts chuckNorrisFacts = (ChuckNorrisFacts) o;
        if (chuckNorrisFacts.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), chuckNorrisFacts.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ChuckNorrisFacts{" +
            "id=" + getId() +
            ", fact='" + getFact() + "'" +
            ", karatepower=" + getKaratepower() +
            ", created_at='" + getCreated_at() + "'" +
            "}";
    }
}
