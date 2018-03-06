import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ChuckNorrisFacts } from './chuck-norris-facts.model';
import { ChuckNorrisFactsService } from './chuck-norris-facts.service';

@Injectable()
export class ChuckNorrisFactsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private chuckNorrisFactsService: ChuckNorrisFactsService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.chuckNorrisFactsService.find(id)
                    .subscribe((chuckNorrisFactsResponse: HttpResponse<ChuckNorrisFacts>) => {
                        const chuckNorrisFacts: ChuckNorrisFacts = chuckNorrisFactsResponse.body;
                        chuckNorrisFacts.created_at = this.datePipe
                            .transform(chuckNorrisFacts.created_at, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.chuckNorrisFactsModalRef(component, chuckNorrisFacts);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.chuckNorrisFactsModalRef(component, new ChuckNorrisFacts());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    chuckNorrisFactsModalRef(component: Component, chuckNorrisFacts: ChuckNorrisFacts): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.chuckNorrisFacts = chuckNorrisFacts;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
