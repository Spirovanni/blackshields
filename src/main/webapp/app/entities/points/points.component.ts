import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPoints } from 'app/shared/model/points.model';
import { AccountService } from 'app/core';
import { PointsService } from './points.service';

@Component({
  selector: 'jhi-points',
  templateUrl: './points.component.html'
})
export class PointsComponent implements OnInit, OnDestroy {
  points: IPoints[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected pointsService: PointsService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.pointsService
      .query()
      .pipe(
        filter((res: HttpResponse<IPoints[]>) => res.ok),
        map((res: HttpResponse<IPoints[]>) => res.body)
      )
      .subscribe(
        (res: IPoints[]) => {
          this.points = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPoints();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPoints) {
    return item.id;
  }

  registerChangeInPoints() {
    this.eventSubscriber = this.eventManager.subscribe('pointsListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
