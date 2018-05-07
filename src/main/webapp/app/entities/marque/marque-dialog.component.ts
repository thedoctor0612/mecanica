import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Marque } from './marque.model';
import { MarquePopupService } from './marque-popup.service';
import { MarqueService } from './marque.service';

@Component({
    selector: 'jhi-marque-dialog',
    templateUrl: './marque-dialog.component.html'
})
export class MarqueDialogComponent implements OnInit {

    marque: Marque;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private marqueService: MarqueService,
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
        if (this.marque.id !== undefined) {
            this.subscribeToSaveResponse(
                this.marqueService.update(this.marque));
        } else {
            this.subscribeToSaveResponse(
                this.marqueService.create(this.marque));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Marque>>) {
        result.subscribe((res: HttpResponse<Marque>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Marque) {
        this.eventManager.broadcast({ name: 'marqueListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-marque-popup',
    template: ''
})
export class MarquePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private marquePopupService: MarquePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.marquePopupService
                    .open(MarqueDialogComponent as Component, params['id']);
            } else {
                this.marquePopupService
                    .open(MarqueDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
