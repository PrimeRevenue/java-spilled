/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JavaSpilledTestModule } from '../../../test.module';
import { ChuckNorrisFactsDetailComponent } from '../../../../../../main/webapp/app/entities/chuck-norris-facts/chuck-norris-facts-detail.component';
import { ChuckNorrisFactsService } from '../../../../../../main/webapp/app/entities/chuck-norris-facts/chuck-norris-facts.service';
import { ChuckNorrisFacts } from '../../../../../../main/webapp/app/entities/chuck-norris-facts/chuck-norris-facts.model';

describe('Component Tests', () => {

    describe('ChuckNorrisFacts Management Detail Component', () => {
        let comp: ChuckNorrisFactsDetailComponent;
        let fixture: ComponentFixture<ChuckNorrisFactsDetailComponent>;
        let service: ChuckNorrisFactsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JavaSpilledTestModule],
                declarations: [ChuckNorrisFactsDetailComponent],
                providers: [
                    ChuckNorrisFactsService
                ]
            })
            .overrideTemplate(ChuckNorrisFactsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChuckNorrisFactsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChuckNorrisFactsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ChuckNorrisFacts(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.chuckNorrisFacts).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
