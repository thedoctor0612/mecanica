package org.ms.mecanica.service;

import org.ms.mecanica.domain.Marque;
import org.ms.mecanica.repository.MarqueRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Marque.
 */
@Service
@Transactional
public class MarqueService {

    private final Logger log = LoggerFactory.getLogger(MarqueService.class);

    private final MarqueRepository marqueRepository;

    public MarqueService(MarqueRepository marqueRepository) {
        this.marqueRepository = marqueRepository;
    }

    /**
     * Save a marque.
     *
     * @param marque the entity to save
     * @return the persisted entity
     */
    public Marque save(Marque marque) {
        log.debug("Request to save Marque : {}", marque);
        return marqueRepository.save(marque);
    }

    /**
     * Get all the marques.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Marque> findAll(Pageable pageable) {
        log.debug("Request to get all Marques");
        return marqueRepository.findAll(pageable);
    }

    /**
     * Get one marque by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Marque findOne(Long id) {
        log.debug("Request to get Marque : {}", id);
        return marqueRepository.findOne(id);
    }

    /**
     * Delete the marque by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Marque : {}", id);
        marqueRepository.delete(id);
    }
}
