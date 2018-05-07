import { BaseEntity } from './../../shared';

export class Car implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public name?: string,
        public description?: string,
        public valide?: boolean,
        public marque?: BaseEntity,
        public articles?: BaseEntity[],
    ) {
        this.valide = false;
    }
}
