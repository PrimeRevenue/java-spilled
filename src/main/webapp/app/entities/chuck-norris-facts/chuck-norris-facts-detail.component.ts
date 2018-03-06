import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ChuckNorrisFacts } from './chuck-norris-facts.model';
import { ChuckNorrisFactsService } from './chuck-norris-facts.service';

@Component({
    selector: 'jhi-chuck-norris-facts-detail',
    templateUrl: './chuck-norris-facts-detail.component.html'
})
export class ChuckNorrisFactsDetailComponent implements OnInit, OnDestroy {

    chuckNorrisFacts: ChuckNorrisFacts;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private chuckNorrisFactsService: ChuckNorrisFactsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInChuckNorrisFacts();
    }

    load(id) {
        this.chuckNorrisFactsService.find(id)
            .subscribe((chuckNorrisFactsResponse: HttpResponse<ChuckNorrisFacts>) => {
                this.chuckNorrisFacts = chuckNorrisFactsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInChuckNorrisFacts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'chuckNorrisFactsListModification',
            (response) => this.load(this.chuckNorrisFacts.id)
        );
    }
}
