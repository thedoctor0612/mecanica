import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { JhiLanguageService } from 'ng-jhipster';

import { Principal, AccountService, JhiLanguageHelper } from '../../shared';

@Component({
        selector: 'jhi-profile',
        templateUrl: './profile.component.html',
        styleUrls: [
        ],
        animations: [
                trigger('fadeInOutTranslate', [
                        transition(':enter', [
                                style({ opacity: 0 }),
                                animate('400ms ease-in-out', style({ opacity: 1 }))
                        ]),
                        transition(':leave', [
                                style({ transform: 'translate(0)' }),
                                animate('400ms ease-in-out', style({ opacity: 0 }))
                        ])
                ])
        ]
})
export class ProfileComponent implements OnInit {
        editProfile = true;
        editProfileIcon = 'icofont-edit';

        editAbout = true;
        editAboutIcon = 'icofont-edit';

        public editor;
        public editorContent: string;

        public data: any;
        public rowsOnPage = 10;
        public filterQuery = '';
        public sortBy = '';
        public sortOrder = 'desc';
        profitChartOption: any;

        rowsContact = [];
        loadingIndicator = true;
        reorderable = true;

        error: string;
        success: string;
        settingsAccount: any;
        languages: any[];

        constructor(
                private account: AccountService,
                private principal: Principal,
                private languageService: JhiLanguageService,
                private languageHelper: JhiLanguageHelper
        ) {
                /* this.fetchContactData((data) => {
                        this.rowsContact = data;
                        setTimeout(() => { this.loadingIndicator = false; }, 1500);
                }); */
        }

        copyAccount(account) {
                return {
                        activated: account.activated,
                        email: account.email,
                        firstName: account.firstName,
                        langKey: account.langKey,
                        lastName: account.lastName,
                        login: account.login,
                        imageUrl: account.imageUrl
                };
        }

        save() {
                this.account.save(this.settingsAccount).subscribe(() => {
                        this.error = null;
                        this.success = 'OK';
                        this.toggleEditProfile();
                        this.principal.identity(true).then((account) => {
                                this.settingsAccount = this.copyAccount(account);
                        });
                        this.languageService.getCurrent().then((current) => {
                                if (this.settingsAccount.langKey !== current) {
                                        this.languageService.changeLanguage(this.settingsAccount.langKey);
                                }
                        });
                }, () => {
                        this.success = null;
                        this.error = 'ERROR';
                });
        }

        setActive(user, isActivated) {
                user.activated = isActivated;
        }

        ngOnInit() {
                this.principal.identity().then((account) => {
                        this.settingsAccount = this.copyAccount(account);
                });
                this.languageHelper.getAll().then((languages) => {
                        this.languages = languages;
                });

                setTimeout(() => {
                        this.editorContent = this.settingsAccount.email;
                }, 2800);

                setTimeout(() => {
                        this.profitChartOption = {
                                tooltip: {
                                        trigger: 'item',
                                        formatter(params) {
                                                const date = new Date(params.value[0]);
                                                let data = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ';
                                                data += date.getHours() + ':' + date.getMinutes();
                                                return data + '<br/>' + params.value[1] + ', ' + params.value[2];
                                        },
                                        responsive: true
                                },
                                dataZoom: {
                                        show: true,
                                        start: 70
                                },
                                legend: {
                                        data: ['Profit']
                                },
                                grid: {
                                        y2: 80
                                },
                                xAxis: [{
                                        type: 'time',
                                        splitNumber: 10
                                }],
                                yAxis: [{
                                        type: 'value'
                                }],
                                series: [{
                                        name: 'Profit',
                                        type: 'line',
                                        showAllSymbol: true,
                                        symbolSize(value) {
                                                return Math.round(value[2] / 10) + 2;
                                        },
                                        data: (function() {
                                                const d: any = [];
                                                let len = 0;
                                                const now = new Date();
                                                while (len++ < 200) {
                                                        const random1: any = (Math.random() * 30).toFixed(2);
                                                        const random2: any = (Math.random() * 100).toFixed(2);
                                                        d.push([new Date(2014, 9, 1, 0, len * 10000), random1 - 0, random2 - 0]);
                                                }
                                                return d;
                                        })()
                                }]
                        };
                }, 1);
        }

        fetchContactData(cb) {
                const req = new XMLHttpRequest();
                req.open('GET', 'assets/data/data.json');

                req.onload = () => {
                        cb(JSON.parse(req.response));
                };

                req.send();
        }

        toggleEditProfile() {
                this.editProfileIcon = (this.editProfileIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
                this.editProfile = !this.editProfile;
        }

        toggleEditAbout() {
                this.editAboutIcon = (this.editAboutIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
                this.editAbout = !this.editAbout;
        }

}
