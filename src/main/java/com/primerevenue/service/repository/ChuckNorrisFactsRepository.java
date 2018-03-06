package com.primerevenue.service.repository;

import com.primerevenue.service.domain.ChuckNorrisFacts;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ChuckNorrisFacts entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChuckNorrisFactsRepository extends JpaRepository<ChuckNorrisFacts, Long> {

}
