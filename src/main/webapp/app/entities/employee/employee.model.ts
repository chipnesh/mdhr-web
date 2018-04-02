import { BaseEntity } from './../../shared';

export class Employee implements BaseEntity {
    constructor(
        public id?: number,
        public firstname?: string,
        public lastname?: string,
        public middlename?: string,
        public phone?: string,
        public email?: string,
        public birthDate?: any,
        public workingSince?: any,
    ) {
    }
}
