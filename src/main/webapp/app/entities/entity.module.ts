import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { WebDepartmentModule } from './department/department.module';
import { WebEmployeeModule } from './employee/employee.module';
import { WebPositionModule } from './position/position.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        WebDepartmentModule,
        WebEmployeeModule,
        WebPositionModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebEntityModule {}
