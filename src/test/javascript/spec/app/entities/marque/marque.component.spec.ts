/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MecanicaTestModule } from '../../../test.module';
import { MarqueComponent } from '../../../../../../main/webapp/app/entities/marque/marque.component';
import { MarqueService } from '../../../../../../main/webapp/app/entities/marque/marque.service';
import { Marque } from '../../../../../../main/webapp/app/entities/marque/marque.model';

describe('Component Tests', () => {

    describe('Marque Management Component', () => {
        let comp: MarqueComponent;
        let fixture: ComponentFixture<MarqueComponent>;
        let service: MarqueService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MecanicaTestModule],
                declarations: [MarqueComponent],
                providers: [
                    MarqueService
                ]
            })
            .overrideTemplate(MarqueComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MarqueComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MarqueService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Marque(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.marques[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
