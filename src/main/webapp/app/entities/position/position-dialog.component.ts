import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Position } from './position.model';
import { PositionPopupService } from './position-popup.service';
import { PositionService } from './position.service';
import { Department, DepartmentService } from '../department';

@Component({
    selector: 'jhi-position-dialog',
    templateUrl: './position-dialog.component.html'
})
export class PositionDialogComponent implements OnInit {

    position: Position;
    isSaving: boolean;

    departments: Department[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private positionService: PositionService,
        private departmentService: DepartmentService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.departmentService.query()
            .subscribe((res: HttpResponse<Department[]>) => {
                this.departments = res.body;
                }, (res: HttpErrorResponse) => {
                this.onError(res.message);
            });
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.position.id !== undefined) {
            this.subscribeToSaveResponse(
                this.positionService.update(this.position));
        } else {
            this.subscribeToSaveResponse(
                this.positionService.create(this.position));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Position>>) {
        result.subscribe((res: HttpResponse<Position>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Position) {
        this.eventManager.broadcast({ name: 'positionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDepartmentById(index: number, item: Department) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-position-popup',
    template: ''
})
export class PositionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private positionPopupService: PositionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.positionPopupService
                    .open(PositionDialogComponent as Component, params['id']);
            } else {
                this.positionPopupService
                    .open(PositionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
