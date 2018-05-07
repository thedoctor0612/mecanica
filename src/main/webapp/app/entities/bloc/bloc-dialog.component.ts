import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Bloc } from './bloc.model';
import { BlocPopupService } from './bloc-popup.service';
import { BlocService } from './bloc.service';

@Component({
    selector: 'jhi-bloc-dialog',
    templateUrl: './bloc-dialog.component.html'
})
export class BlocDialogComponent implements OnInit {

    bloc: Bloc;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private blocService: BlocService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.bloc.id !== undefined) {
            this.subscribeToSaveResponse(
                this.blocService.update(this.bloc));
        } else {
            this.subscribeToSaveResponse(
                this.blocService.create(this.bloc));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Bloc>>) {
        result.subscribe((res: HttpResponse<Bloc>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Bloc) {
        this.eventManager.broadcast({ name: 'blocListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-bloc-popup',
    template: ''
})
export class BlocPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private blocPopupService: BlocPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.blocPopupService
                    .open(BlocDialogComponent as Component, params['id']);
            } else {
                this.blocPopupService
                    .open(BlocDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
