/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JavaSpilledTestModule } from '../../../test.module';
import { ChuckNorrisFactsComponent } from '../../../../../../main/webapp/app/entities/chuck-norris-facts/chuck-norris-facts.component';
import { ChuckNorrisFactsService } from '../../../../../../main/webapp/app/entities/chuck-norris-facts/chuck-norris-facts.service';
import { ChuckNorrisFacts } from '../../../../../../main/webapp/app/entities/chuck-norris-facts/chuck-norris-facts.model';

describe('Component Tests', () => {

    describe('ChuckNorrisFacts Management Component', () => {
        let comp: ChuckNorrisFactsComponent;
        let fixture: ComponentFixture<ChuckNorrisFactsComponent>;
        let service: ChuckNorrisFactsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JavaSpilledTestModule],
                declarations: [ChuckNorrisFactsComponent],
                providers: [
                    ChuckNorrisFactsService
                ]
            })
            .overrideTemplate(ChuckNorrisFactsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChuckNorrisFactsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChuckNorrisFactsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ChuckNorrisFacts(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.chuckNorrisFacts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
