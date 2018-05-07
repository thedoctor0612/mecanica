import { BaseEntity } from './../../shared';

export class Bloc implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public name?: string,
        public description?: string,
        public valide?: boolean,
    ) {
        this.valide = false;
    }
}
