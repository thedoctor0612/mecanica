import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { ActivateService } from './activate.service';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-activate',
    templateUrl: './activate.component.html'
})
export class ActivateComponent implements OnInit {
    error: string;
    success: string;
    modalRef: NgbModalRef;

    constructor(
        private activateService: ActivateService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe((params) => {
            this.activateService.get(params['key']).subscribe(() => {
                this.error = null;
                this.success = 'OK';
            }, () => {
                this.success = null;
                this.error = 'ERROR';
            });
        });
    }

    login() {
        this.router.navigate(['/login']);
    }
}
