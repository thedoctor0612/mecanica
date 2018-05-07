package org.ms.mecanica.repository;

import org.ms.mecanica.domain.Marque;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Marque entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MarqueRepository extends JpaRepository<Marque, Long> {

}
