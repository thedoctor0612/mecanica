import { BaseEntity } from './../../shared';

export class Article implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public description?: string,
        public prixAchat?: number,
        public prixVente?: number,
        public note?: string,
        public valide?: boolean,
        public existenceMagasin?: boolean,
        public barCode?: string,
        public bloc?: BaseEntity,
        public cars?: BaseEntity[],
    ) {
        this.valide = false;
        this.existenceMagasin = false;
    }
}
