package org.ms.mecanica.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.ms.mecanica.domain.Bloc;
import org.ms.mecanica.service.BlocService;
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
 * REST controller for managing Bloc.
 */
@RestController
@RequestMapping("/api")
public class BlocResource {

    private final Logger log = LoggerFactory.getLogger(BlocResource.class);

    private static final String ENTITY_NAME = "bloc";

    private final BlocService blocService;

    public BlocResource(BlocService blocService) {
        this.blocService = blocService;
    }

    /**
     * POST  /blocs : Create a new bloc.
     *
     * @param bloc the bloc to create
     * @return the ResponseEntity with status 201 (Created) and with body the new bloc, or with status 400 (Bad Request) if the bloc has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/blocs")
    @Timed
    public ResponseEntity<Bloc> createBloc(@RequestBody Bloc bloc) throws URISyntaxException {
        log.debug("REST request to save Bloc : {}", bloc);
        if (bloc.getId() != null) {
            throw new BadRequestAlertException("A new bloc cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Bloc result = blocService.save(bloc);
        return ResponseEntity.created(new URI("/api/blocs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /blocs : Updates an existing bloc.
     *
     * @param bloc the bloc to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated bloc,
     * or with status 400 (Bad Request) if the bloc is not valid,
     * or with status 500 (Internal Server Error) if the bloc couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/blocs")
    @Timed
    public ResponseEntity<Bloc> updateBloc(@RequestBody Bloc bloc) throws URISyntaxException {
        log.debug("REST request to update Bloc : {}", bloc);
        if (bloc.getId() == null) {
            return createBloc(bloc);
        }
        Bloc result = blocService.save(bloc);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, bloc.getId().toString()))
            .body(result);
    }

    /**
     * GET  /blocs : get all the blocs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of blocs in body
     */
    @GetMapping("/blocs")
    @Timed
    public ResponseEntity<List<Bloc>> getAllBlocs(Pageable pageable) {
        log.debug("REST request to get a page of Blocs");
        Page<Bloc> page = blocService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/blocs");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /blocs/:id : get the "id" bloc.
     *
     * @param id the id of the bloc to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the bloc, or with status 404 (Not Found)
     */
    @GetMapping("/blocs/{id}")
    @Timed
    public ResponseEntity<Bloc> getBloc(@PathVariable Long id) {
        log.debug("REST request to get Bloc : {}", id);
        Bloc bloc = blocService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(bloc));
    }

    /**
     * DELETE  /blocs/:id : delete the "id" bloc.
     *
     * @param id the id of the bloc to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/blocs/{id}")
    @Timed
    public ResponseEntity<Void> deleteBloc(@PathVariable Long id) {
        log.debug("REST request to delete Bloc : {}", id);
        blocService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
