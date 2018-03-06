import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ChuckNorrisFacts } from './chuck-norris-facts.model';
import { ChuckNorrisFactsPopupService } from './chuck-norris-facts-popup.service';
import { ChuckNorrisFactsService } from './chuck-norris-facts.service';

@Component({
    selector: 'jhi-chuck-norris-facts-delete-dialog',
    templateUrl: './chuck-norris-facts-delete-dialog.component.html'
})
export class ChuckNorrisFactsDeleteDialogComponent {

    chuckNorrisFacts: ChuckNorrisFacts;

    constructor(
        private chuckNorrisFactsService: ChuckNorrisFactsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.chuckNorrisFactsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'chuckNorrisFactsListModification',
                content: 'Deleted an chuckNorrisFacts'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-chuck-norris-facts-delete-popup',
    template: ''
})
export class ChuckNorrisFactsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private chuckNorrisFactsPopupService: ChuckNorrisFactsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.chuckNorrisFactsPopupService
                .open(ChuckNorrisFactsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
