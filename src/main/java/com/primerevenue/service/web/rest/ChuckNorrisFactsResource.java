package com.primerevenue.service.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.primerevenue.service.domain.ChuckNorrisFacts;

import com.primerevenue.service.repository.ChuckNorrisFactsRepository;
import com.primerevenue.service.web.rest.errors.BadRequestAlertException;
import com.primerevenue.service.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.Random;

/**
 * REST controller for managing ChuckNorrisFacts.
 */
@RestController
@RequestMapping("/api")
public class ChuckNorrisFactsResource {

   private final Logger log = LoggerFactory.getLogger(Object.class.getName());

    private static final String ENTITY_NAME = "chuckNorrisFacts";

    private final ChuckNorrisFactsRepository chuckNorrisFactsRepository;

    public ChuckNorrisFactsResource(ChuckNorrisFactsRepository chuckNorrisFactsRepository) {
        this.chuckNorrisFactsRepository = chuckNorrisFactsRepository;
    }

    /**
     * POST  /chuck-norris-facts : Create a new chuckNorrisFacts.
     *
     * @param chuckNorrisFacts the chuckNorrisFacts to create
     * @return the ResponseEntity with status 201 (Created) and with body the new chuckNorrisFacts, or with status 400 (Bad Request) if the chuckNorrisFacts has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     * @throws Exception
     */
    @PostMapping("/chuck-norris-facts")
    @Timed
    public ResponseEntity<ChuckNorrisFacts> createChuckNorrisFacts(@RequestBody ChuckNorrisFacts chuckNorrisFacts) throws URISyntaxException, Exception {
    		chuckNorrisFacts.setId(Random.class.newInstance().nextLong());
        log.debug("REST request to save ChuckNorrisFacts : {}", chuckNorrisFacts);
        if (chuckNorrisFacts.getId() != null) {
            throw new BadRequestAlertException("A new chuckNorrisFacts cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ChuckNorrisFacts result = chuckNorrisFactsRepository.save(chuckNorrisFacts);
        return ResponseEntity.created(new URI("/api/chuck-norris-facts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /chuck-norris-facts : Updates an existing chuckNorrisFacts.
     *
     * @param chuckNorrisFacts the chuckNorrisFacts to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated chuckNorrisFacts,
     * or with status 400 (Bad Request) if the chuckNorrisFacts is not valid,
     * or with status 500 (Internal Server Error) if the chuckNorrisFacts couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/chuck-norris-facts")
    @Timed
    public ResponseEntity<ChuckNorrisFacts> updateChuckNorrisFacts(@RequestBody ChuckNorrisFacts chuckNorrisFacts) throws URISyntaxException, Exception {
        log.debug("REST request to update ChuckNorrisFacts : {}", chuckNorrisFacts);
        if (chuckNorrisFacts.getId() == null) {
            return createChuckNorrisFacts(chuckNorrisFacts);
        }
        ChuckNorrisFacts result = chuckNorrisFactsRepository.save(chuckNorrisFacts);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, chuckNorrisFacts.getId().toString()))
            .body(result);
    }

    /**
     * GET  /chuck-norris-facts : get all the chuckNorrisFacts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of chuckNorrisFacts in body
     */
    @GetMapping("/chuck-norris-facts")
    @Timed
    public List<ChuckNorrisFacts> getAllChuckNorrisFacts() {
        log.info("REST request to get all ChuckNorrisFacts!");
        return chuckNorrisFactsRepository.findAll();
        }

    /**
     * GET  /chuck-norris-facts/:id : get the "id" chuckNorrisFacts.
     *
     * @param id the id of the chuckNorrisFacts to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the chuckNorrisFacts, or with status 404 (Not Found)
     */
    @GetMapping("/chuck-norris-facts/{id}")
    @Timed
    public ResponseEntity<ChuckNorrisFacts> getChuckNorrisFacts(@PathVariable Long id) {
        log.debug("REST request to get ChuckNorrisFacts : {}", id);
        ChuckNorrisFacts chuckNorrisFacts = chuckNorrisFactsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(chuckNorrisFacts));
    }

    /**
     * DELETE  /chuck-norris-facts/:id : delete the "id" chuckNorrisFacts.
     *
     * @param id the id of the chuckNorrisFacts to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/chuck-norris-facts/{id}")
    @Timed
    public ResponseEntity<Void> deleteChuckNorrisFacts(@PathVariable Long id) {
        log.debug("REST request to delete ChuckNorrisFacts : {}", id);
        chuckNorrisFactsRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
