import { BaseEntity } from './../../shared';

export class Position implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public departmentId?: number,
        public departmentName?: number,
    ) {
    }
}
