/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JavaSpilledTestModule } from '../../../test.module';
import { ChuckNorrisFactsDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/chuck-norris-facts/chuck-norris-facts-delete-dialog.component';
import { ChuckNorrisFactsService } from '../../../../../../main/webapp/app/entities/chuck-norris-facts/chuck-norris-facts.service';

describe('Component Tests', () => {

    describe('ChuckNorrisFacts Management Delete Component', () => {
        let comp: ChuckNorrisFactsDeleteDialogComponent;
        let fixture: ComponentFixture<ChuckNorrisFactsDeleteDialogComponent>;
        let service: ChuckNorrisFactsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JavaSpilledTestModule],
                declarations: [ChuckNorrisFactsDeleteDialogComponent],
                providers: [
                    ChuckNorrisFactsService
                ]
            })
            .overrideTemplate(ChuckNorrisFactsDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChuckNorrisFactsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChuckNorrisFactsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
