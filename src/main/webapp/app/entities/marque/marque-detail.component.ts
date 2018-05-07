import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Marque } from './marque.model';
import { MarqueService } from './marque.service';

@Component({
    selector: 'jhi-marque-detail',
    templateUrl: './marque-detail.component.html'
})
export class MarqueDetailComponent implements OnInit, OnDestroy {

    marque: Marque;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private marqueService: MarqueService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMarques();
    }

    load(id) {
        this.marqueService.find(id)
            .subscribe((marqueResponse: HttpResponse<Marque>) => {
                this.marque = marqueResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMarques() {
        this.eventSubscriber = this.eventManager.subscribe(
            'marqueListModification',
            (response) => this.load(this.marque.id)
        );
    }
}
