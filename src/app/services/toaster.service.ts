import { Injectable } from '@angular/core';
import { ActiveToast, IndividualConfig, ToastrService } from 'ngx-toastr';

const INFO_TOASTER_CONFIG: Partial<IndividualConfig> = {
  timeOut: 2500,
  enableHtml: true,
};

const ERROR_TOASTER_CONFIG: Partial<IndividualConfig> = {
  disableTimeOut: true,
  enableHtml: true,
  closeButton: true,
};
const SUCCESS_TOASTER_CONFIG: Partial<IndividualConfig> = INFO_TOASTER_CONFIG;

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private toasterService: ToastrService) {}

  public showToaster(
    type: 'info' | 'error' | 'success',
    title?: string,
    message?: string,
    config?: Partial<IndividualConfig>
  ): ActiveToast<any> | void {
    switch (type) {
      case 'info':
        return this.toasterService.info(message, title, {
          ...INFO_TOASTER_CONFIG,
          ...config,
        });
      case 'error':
        return this.toasterService.error(message, title, {
          ...ERROR_TOASTER_CONFIG,
          ...config,
        });
      case 'success':
        return this.toasterService.success(message, title, {
          ...INFO_TOASTER_CONFIG,
          ...config,
        });
      default:
        throw 'This toaster type is not implemented yet';
    }
  }
}
