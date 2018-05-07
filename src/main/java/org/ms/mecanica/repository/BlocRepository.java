package org.ms.mecanica.repository;

import org.ms.mecanica.domain.Bloc;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Bloc entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BlocRepository extends JpaRepository<Bloc, Long> {

}
