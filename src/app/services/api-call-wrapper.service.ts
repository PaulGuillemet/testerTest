import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ApiUtils } from '../utils/apiUtils';
import { ApiCallWrapper } from '../model/apiCallWrapper';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root',
})
export class ApiCallWrapperService {
  constructor(public toasterService: ToasterService) {}

  public async makeApiCall(
    apiCall: Observable<any>,
    callLabel: string,
    showNotification: boolean = false
  ): Promise<ApiCallWrapper> {
    return new Promise((resolve) => {
      apiCall
        .pipe(
          catchError((err) => {
            console.log({ err });
            const error = ApiUtils.getErrorMessage(err, callLabel);
            if (showNotification) {
              this.toasterService.showToaster(
                'error',
                /* `Erreur lors de l${
                  ['a', 'e', 'i', 'o', 'u', 'y'].includes(callLabel.charAt(0))
                    ? "'"
                    : 'a '
                }${callLabel}`, */
                'Erreur 500',
                error.message,
                { disableTimeOut: true }
              );
            }
            resolve({
              error,
            });
            throw err;
          })
        )
        .subscribe((resp) => {
          resolve({ resp: resp?.content });
        });
    });
  }
}
