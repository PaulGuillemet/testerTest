import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiErrorDisplay } from 'src/app/model/models';

export class CustomAsyncDataSource<T> implements DataSource<T> {
  public elementsSubject = new BehaviorSubject<T[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private nbOfResultsSubject = new BehaviorSubject<number>(0);
  private errorDisplaySubject = new BehaviorSubject<ApiErrorDisplay>(null);

  public sort: any;

  public loading$ = this.loadingSubject.asObservable();
  public numberOfResults$ = this.nbOfResultsSubject.asObservable();
  public errorDisplay$ = this.errorDisplaySubject.asObservable();

  constructor(public funcToCall: Function) {}

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    return this.elementsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.elementsSubject.complete();
    this.loadingSubject.complete();
    this.nbOfResultsSubject.complete();
    this.errorDisplaySubject.complete();
  }

  load(...args: any[]) {
    this.loadingSubject.next(true);

    from(this.funcToCall(...args))
      .pipe(tap(console.log))
      .subscribe((resp) => {
        this.sortOnProp(resp.resp?.results || [], 'name', 'asc');
        this.loadingSubject.next(false);
        this.elementsSubject.next(resp.resp?.results || []);
        this.nbOfResultsSubject.next(resp.resp?.totalNumberOfResults || 0);
        this.errorDisplaySubject.next(resp.error);
      });
  }

  sortOnProp(elsToSort: any[], attrName: string, direction: 'desc' | 'asc') {
    const dir = direction === 'asc' ? 1 : -1;
    elsToSort.sort(function (a, b) {
      if (a[attrName] < b[attrName]) {
        return dir * -1;
      }
      if (a[attrName] > b[attrName]) {
        return dir;
      }
      return 0;
    });
  }
}
