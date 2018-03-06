import { BaseEntity } from './../../shared';

export class ChuckNorrisFacts implements BaseEntity {
    constructor(
        public id?: number,
        public fact?: string,
        public karatepower?: number,
        public created_at?: any,
    ) {
    }
}
