import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Bloc } from './bloc.model';
import { BlocService } from './bloc.service';

@Component({
    selector: 'jhi-bloc-detail',
    templateUrl: './bloc-detail.component.html'
})
export class BlocDetailComponent implements OnInit, OnDestroy {

    bloc: Bloc;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private blocService: BlocService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBlocs();
    }

    load(id) {
        this.blocService.find(id)
            .subscribe((blocResponse: HttpResponse<Bloc>) => {
                this.bloc = blocResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBlocs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'blocListModification',
            (response) => this.load(this.bloc.id)
        );
    }
}
