/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MecanicaTestModule } from '../../../test.module';
import { BlocComponent } from '../../../../../../main/webapp/app/entities/bloc/bloc.component';
import { BlocService } from '../../../../../../main/webapp/app/entities/bloc/bloc.service';
import { Bloc } from '../../../../../../main/webapp/app/entities/bloc/bloc.model';

describe('Component Tests', () => {

    describe('Bloc Management Component', () => {
        let comp: BlocComponent;
        let fixture: ComponentFixture<BlocComponent>;
        let service: BlocService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MecanicaTestModule],
                declarations: [BlocComponent],
                providers: [
                    BlocService
                ]
            })
            .overrideTemplate(BlocComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BlocComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BlocService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Bloc(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.blocs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
