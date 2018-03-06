/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JavaSpilledTestModule } from '../../../test.module';
import { ChuckNorrisFactsDialogComponent } from '../../../../../../main/webapp/app/entities/chuck-norris-facts/chuck-norris-facts-dialog.component';
import { ChuckNorrisFactsService } from '../../../../../../main/webapp/app/entities/chuck-norris-facts/chuck-norris-facts.service';
import { ChuckNorrisFacts } from '../../../../../../main/webapp/app/entities/chuck-norris-facts/chuck-norris-facts.model';

describe('Component Tests', () => {

    describe('ChuckNorrisFacts Management Dialog Component', () => {
        let comp: ChuckNorrisFactsDialogComponent;
        let fixture: ComponentFixture<ChuckNorrisFactsDialogComponent>;
        let service: ChuckNorrisFactsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JavaSpilledTestModule],
                declarations: [ChuckNorrisFactsDialogComponent],
                providers: [
                    ChuckNorrisFactsService
                ]
            })
            .overrideTemplate(ChuckNorrisFactsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChuckNorrisFactsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChuckNorrisFactsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ChuckNorrisFacts(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.chuckNorrisFacts = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'chuckNorrisFactsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ChuckNorrisFacts();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.chuckNorrisFacts = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'chuckNorrisFactsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
