package org.ms.mecanica.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Article.
 */
@Entity
@Table(name = "article")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Article implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "description")
    private String description;

    @Column(name = "prix_achat", precision=10, scale=2)
    private BigDecimal prixAchat;

    @Column(name = "prix_vente", precision=10, scale=2)
    private BigDecimal prixVente;

    @Column(name = "note")
    private String note;

    @Column(name = "valide")
    private Boolean valide;

    @Column(name = "existence_magasin")
    private Boolean existenceMagasin;

    @Column(name = "bar_code")
    private String barCode;

    @ManyToOne
    private Bloc bloc;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "article_car",
               joinColumns = @JoinColumn(name="articles_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="cars_id", referencedColumnName="id"))
    private Set<Car> cars = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public Article code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public Article description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrixAchat() {
        return prixAchat;
    }

    public Article prixAchat(BigDecimal prixAchat) {
        this.prixAchat = prixAchat;
        return this;
    }

    public void setPrixAchat(BigDecimal prixAchat) {
        this.prixAchat = prixAchat;
    }

    public BigDecimal getPrixVente() {
        return prixVente;
    }

    public Article prixVente(BigDecimal prixVente) {
        this.prixVente = prixVente;
        return this;
    }

    public void setPrixVente(BigDecimal prixVente) {
        this.prixVente = prixVente;
    }

    public String getNote() {
        return note;
    }

    public Article note(String note) {
        this.note = note;
        return this;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Boolean isValide() {
        return valide;
    }

    public Article valide(Boolean valide) {
        this.valide = valide;
        return this;
    }

    public void setValide(Boolean valide) {
        this.valide = valide;
    }

    public Boolean isExistenceMagasin() {
        return existenceMagasin;
    }

    public Article existenceMagasin(Boolean existenceMagasin) {
        this.existenceMagasin = existenceMagasin;
        return this;
    }

    public void setExistenceMagasin(Boolean existenceMagasin) {
        this.existenceMagasin = existenceMagasin;
    }

    public String getBarCode() {
        return barCode;
    }

    public Article barCode(String barCode) {
        this.barCode = barCode;
        return this;
    }

    public void setBarCode(String barCode) {
        this.barCode = barCode;
    }

    public Bloc getBloc() {
        return bloc;
    }

    public Article bloc(Bloc bloc) {
        this.bloc = bloc;
        return this;
    }

    public void setBloc(Bloc bloc) {
        this.bloc = bloc;
    }

    public Set<Car> getCars() {
        return cars;
    }

    public Article cars(Set<Car> cars) {
        this.cars = cars;
        return this;
    }

    public Article addCar(Car car) {
        this.cars.add(car);
        car.getArticles().add(this);
        return this;
    }

    public Article removeCar(Car car) {
        this.cars.remove(car);
        car.getArticles().remove(this);
        return this;
    }

    public void setCars(Set<Car> cars) {
        this.cars = cars;
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
        Article article = (Article) o;
        if (article.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), article.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Article{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", description='" + getDescription() + "'" +
            ", prixAchat=" + getPrixAchat() +
            ", prixVente=" + getPrixVente() +
            ", note='" + getNote() + "'" +
            ", valide='" + isValide() + "'" +
            ", existenceMagasin='" + isExistenceMagasin() + "'" +
            ", barCode='" + getBarCode() + "'" +
            "}";
    }
}
