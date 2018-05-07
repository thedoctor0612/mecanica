package org.ms.mecanica.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.ms.mecanica.domain.Marque;
import org.ms.mecanica.service.MarqueService;
import org.ms.mecanica.web.rest.errors.BadRequestAlertException;
import org.ms.mecanica.web.rest.util.HeaderUtil;
import org.ms.mecanica.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Marque.
 */
@RestController
@RequestMapping("/api")
public class MarqueResource {

    private final Logger log = LoggerFactory.getLogger(MarqueResource.class);

    private static final String ENTITY_NAME = "marque";

    private final MarqueService marqueService;

    public MarqueResource(MarqueService marqueService) {
        this.marqueService = marqueService;
    }

    /**
     * POST  /marques : Create a new marque.
     *
     * @param marque the marque to create
     * @return the ResponseEntity with status 201 (Created) and with body the new marque, or with status 400 (Bad Request) if the marque has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/marques")
    @Timed
    public ResponseEntity<Marque> createMarque(@RequestBody Marque marque) throws URISyntaxException {
        log.debug("REST request to save Marque : {}", marque);
        if (marque.getId() != null) {
            throw new BadRequestAlertException("A new marque cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Marque result = marqueService.save(marque);
        return ResponseEntity.created(new URI("/api/marques/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /marques : Updates an existing marque.
     *
     * @param marque the marque to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated marque,
     * or with status 400 (Bad Request) if the marque is not valid,
     * or with status 500 (Internal Server Error) if the marque couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/marques")
    @Timed
    public ResponseEntity<Marque> updateMarque(@RequestBody Marque marque) throws URISyntaxException {
        log.debug("REST request to update Marque : {}", marque);
        if (marque.getId() == null) {
            return createMarque(marque);
        }
        Marque result = marqueService.save(marque);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, marque.getId().toString()))
            .body(result);
    }

    /**
     * GET  /marques : get all the marques.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of marques in body
     */
    @GetMapping("/marques")
    @Timed
    public ResponseEntity<List<Marque>> getAllMarques(Pageable pageable) {
        log.debug("REST request to get a page of Marques");
        Page<Marque> page = marqueService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/marques");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /marques/:id : get the "id" marque.
     *
     * @param id the id of the marque to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the marque, or with status 404 (Not Found)
     */
    @GetMapping("/marques/{id}")
    @Timed
    public ResponseEntity<Marque> getMarque(@PathVariable Long id) {
        log.debug("REST request to get Marque : {}", id);
        Marque marque = marqueService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(marque));
    }

    /**
     * DELETE  /marques/:id : delete the "id" marque.
     *
     * @param id the id of the marque to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/marques/{id}")
    @Timed
    public ResponseEntity<Void> deleteMarque(@PathVariable Long id) {
        log.debug("REST request to delete Marque : {}", id);
        marqueService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
