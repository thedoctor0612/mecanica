import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Marque } from './marque.model';
import { MarquePopupService } from './marque-popup.service';
import { MarqueService } from './marque.service';

@Component({
    selector: 'jhi-marque-delete-dialog',
    templateUrl: './marque-delete-dialog.component.html'
})
export class MarqueDeleteDialogComponent {

    marque: Marque;

    constructor(
        private marqueService: MarqueService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.marqueService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'marqueListModification',
                content: 'Deleted an marque'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-marque-delete-popup',
    template: ''
})
export class MarqueDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private marquePopupService: MarquePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.marquePopupService
                .open(MarqueDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
