/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { MecanicaTestModule } from '../../../test.module';
import { BlocDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/bloc/bloc-delete-dialog.component';
import { BlocService } from '../../../../../../main/webapp/app/entities/bloc/bloc.service';

describe('Component Tests', () => {

    describe('Bloc Management Delete Component', () => {
        let comp: BlocDeleteDialogComponent;
        let fixture: ComponentFixture<BlocDeleteDialogComponent>;
        let service: BlocService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MecanicaTestModule],
                declarations: [BlocDeleteDialogComponent],
                providers: [
                    BlocService
                ]
            })
            .overrideTemplate(BlocDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BlocDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BlocService);
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
