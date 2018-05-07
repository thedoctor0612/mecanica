/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { MecanicaTestModule } from '../../../test.module';
import { MarqueDetailComponent } from '../../../../../../main/webapp/app/entities/marque/marque-detail.component';
import { MarqueService } from '../../../../../../main/webapp/app/entities/marque/marque.service';
import { Marque } from '../../../../../../main/webapp/app/entities/marque/marque.model';

describe('Component Tests', () => {

    describe('Marque Management Detail Component', () => {
        let comp: MarqueDetailComponent;
        let fixture: ComponentFixture<MarqueDetailComponent>;
        let service: MarqueService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MecanicaTestModule],
                declarations: [MarqueDetailComponent],
                providers: [
                    MarqueService
                ]
            })
            .overrideTemplate(MarqueDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MarqueDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MarqueService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Marque(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.marque).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
