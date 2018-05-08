import { Component, OnInit, OnDestroy, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { ITEMS_PER_FILTER_PAGE } from '../../shared';
import { FilterService } from './filter.service';

@Component({
    selector: 'jhi-filter',
    templateUrl: './filter.component.html'
})
export class FilterComponent implements OnDestroy, OnChanges {

    error: any;
    success: any;
    currentSearch: string;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    @Output()
    onSelect = new EventEmitter();

    @Input() entity: any;
    @Input() path: any;
    @Input() headers: any[];
    @Input() searchNotAllowed: boolean;
    datas: any[];

    constructor(
        private filterService: FilterService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
    ) {
        this.itemsPerPage = ITEMS_PER_FILTER_PAGE;
        this.page = 1;
        this.previousPage = 1;
        this.reverse = true;
        this.predicate = 'id';
    }

    loadAll(path: string) {
        if (this.currentSearch) {
            this.filterService.search(path, {
                page: this.page - 1,
                query: this.currentSearch,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res) => this.onSuccess(res.body, res.headers),
                (res) => this.onError(res.body)
                );
            return;
        }
        this.filterService.query(path, {
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res) => this.onSuccess(res.body, res.headers),
            (res) => this.onError(res.body)
            );
    }
    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }
    transition() {
        this.loadAll(this.path);
    }

    clear() {
        this.page = 1;
        this.currentSearch = '';
        this.loadAll(this.path);
    }
    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll(this.path);
    }

    ngOnChanges(changes: SimpleChanges) {
        this.loadAll(this.path);
    }

    ngOnDestroy() {

    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.datas = data;
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    selectEntity(entity) {
        this.onSelect.emit(entity);
    }
}
