package org.ms.mecanica.service;

import org.ms.mecanica.domain.Bloc;
import org.ms.mecanica.repository.BlocRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Bloc.
 */
@Service
@Transactional
public class BlocService {

    private final Logger log = LoggerFactory.getLogger(BlocService.class);

    private final BlocRepository blocRepository;

    public BlocService(BlocRepository blocRepository) {
        this.blocRepository = blocRepository;
    }

    /**
     * Save a bloc.
     *
     * @param bloc the entity to save
     * @return the persisted entity
     */
    public Bloc save(Bloc bloc) {
        log.debug("Request to save Bloc : {}", bloc);
        return blocRepository.save(bloc);
    }

    /**
     * Get all the blocs.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Bloc> findAll(Pageable pageable) {
        log.debug("Request to get all Blocs");
        return blocRepository.findAll(pageable);
    }

    /**
     * Get one bloc by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Bloc findOne(Long id) {
        log.debug("Request to get Bloc : {}", id);
        return blocRepository.findOne(id);
    }

    /**
     * Delete the bloc by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Bloc : {}", id);
        blocRepository.delete(id);
    }
}
