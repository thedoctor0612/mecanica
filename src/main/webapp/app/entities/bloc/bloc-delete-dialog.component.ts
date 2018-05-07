import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Bloc } from './bloc.model';
import { BlocPopupService } from './bloc-popup.service';
import { BlocService } from './bloc.service';

@Component({
    selector: 'jhi-bloc-delete-dialog',
    templateUrl: './bloc-delete-dialog.component.html'
})
export class BlocDeleteDialogComponent {

    bloc: Bloc;

    constructor(
        private blocService: BlocService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.blocService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'blocListModification',
                content: 'Deleted an bloc'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bloc-delete-popup',
    template: ''
})
export class BlocDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private blocPopupService: BlocPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.blocPopupService
                .open(BlocDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
