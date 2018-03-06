import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ChuckNorrisFacts } from './chuck-norris-facts.model';
import { ChuckNorrisFactsPopupService } from './chuck-norris-facts-popup.service';
import { ChuckNorrisFactsService } from './chuck-norris-facts.service';

@Component({
    selector: 'jhi-chuck-norris-facts-dialog',
    templateUrl: './chuck-norris-facts-dialog.component.html'
})
export class ChuckNorrisFactsDialogComponent implements OnInit {

    chuckNorrisFacts: ChuckNorrisFacts;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private chuckNorrisFactsService: ChuckNorrisFactsService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.chuckNorrisFacts.id !== undefined) {
            this.subscribeToSaveResponse(
                this.chuckNorrisFactsService.update(this.chuckNorrisFacts));
        } else {
            this.subscribeToSaveResponse(
                this.chuckNorrisFactsService.create(this.chuckNorrisFacts));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ChuckNorrisFacts>>) {
        result.subscribe((res: HttpResponse<ChuckNorrisFacts>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ChuckNorrisFacts) {
        this.eventManager.broadcast({ name: 'chuckNorrisFactsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-chuck-norris-facts-popup',
    template: ''
})
export class ChuckNorrisFactsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private chuckNorrisFactsPopupService: ChuckNorrisFactsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.chuckNorrisFactsPopupService
                    .open(ChuckNorrisFactsDialogComponent as Component, params['id']);
            } else {
                this.chuckNorrisFactsPopupService
                    .open(ChuckNorrisFactsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
