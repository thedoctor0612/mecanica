/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MecanicaTestModule } from '../../../test.module';
import { CarComponent } from '../../../../../../main/webapp/app/entities/car/car.component';
import { CarService } from '../../../../../../main/webapp/app/entities/car/car.service';
import { Car } from '../../../../../../main/webapp/app/entities/car/car.model';

describe('Component Tests', () => {

    describe('Car Management Component', () => {
        let comp: CarComponent;
        let fixture: ComponentFixture<CarComponent>;
        let service: CarService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MecanicaTestModule],
                declarations: [CarComponent],
                providers: [
                    CarService
                ]
            })
            .overrideTemplate(CarComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CarComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CarService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Car(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cars[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
