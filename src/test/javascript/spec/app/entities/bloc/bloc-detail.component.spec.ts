/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { MecanicaTestModule } from '../../../test.module';
import { BlocDetailComponent } from '../../../../../../main/webapp/app/entities/bloc/bloc-detail.component';
import { BlocService } from '../../../../../../main/webapp/app/entities/bloc/bloc.service';
import { Bloc } from '../../../../../../main/webapp/app/entities/bloc/bloc.model';

describe('Component Tests', () => {

    describe('Bloc Management Detail Component', () => {
        let comp: BlocDetailComponent;
        let fixture: ComponentFixture<BlocDetailComponent>;
        let service: BlocService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MecanicaTestModule],
                declarations: [BlocDetailComponent],
                providers: [
                    BlocService
                ]
            })
            .overrideTemplate(BlocDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BlocDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BlocService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Bloc(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.bloc).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
