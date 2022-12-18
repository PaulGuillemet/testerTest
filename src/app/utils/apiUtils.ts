import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GddUtils } from './gddUtils';
import { ApiErrorDisplay } from '../model/models';
import { GddWebappEventSeverity, CreateEventOptions } from '../model/event';

export class ApiUtils {
  static async retry(
    func: Function,
    condition: Function = () => true,
    stepName: string = '',
    bodySent: any = 'Unavailable',
    retries: number = 2,
    interval: number = 5000
  ) {
    const stepNamePrecision = stepName ? ' for ' + stepName : '';
    let count = 0;
    let resp;
    let error;
    while (count < retries) {
      try {
        resp = await func();
        if (condition(resp)) {
          return resp;
        } else {
          console.log(
            `Call number ${
              count + 1
            } failed${stepNamePrecision}: Condition unfullfilled`
          );
          console.log(resp);
        }
      } catch (err) {
        error = err;
        console.log(
          `Call number ${
            count + 1
          } failed${stepNamePrecision} with following error:`
        );
        console.log(err);
      }
      count++;
      await GddUtils.sleep(interval);
    }

    console.log(
      `Call failed ${stepNamePrecision} after ${retries} retries. Stopping Synchro:`
    );
    throw {
      message: `Api call error: Call failed${stepNamePrecision}`,
      responseReceived: resp,
      error,
      bodySent,
    };
  }

  static getErrorMessage(error: any, errorType: string = ''): ApiErrorDisplay {
    const ofErrorTypeWording = `${
      ['a', 'e', 'i', 'o', 'u', 'y'].includes(errorType.charAt(0))
        ? `d'`
        : 'de '
    }${errorType}`;
    if (!navigator.onLine) {
      return {
        message: `Merci de vérifier votre connexion et réessayer.`,
        retryable: true,
      };
    }
    const status = error?.status || error?.error?.status;
    if (!status) {
      return {
        message: `Une erreur technique s'est produite, merci de contacter le support.`,
      };
    }
    switch (status) {
      case 400:
        return {
          code: 400,
          message: `Requête rejetée par le serveur, merci de contacter le support.`,
        };
      case 401:
        return {
          code: 401,
          message: `Votre authentification Gardian a expiré, merci de vous reconnecter.`,
        };
      case 403:
        return {
          code: 403,
          message: `L'accès à cette ressource n'est pas autorisé. Merci de contacter le support.`,
        };
      // case 409:
      //   return `Erreur ${ofErrorTypeWording}, conflit détecté.`;
      case 500:
        return {
          code: 500,
          message: `Une erreur non gérée s'est produite, merci de contacter le support.`,
        };
      case 503:
        return {
          code: 503,
          message: `Le service est temporairement indisponible, merci de réessayer ultérieurement.`,
          retryable: true,
        };
      default:
        return {
          message: `Une erreur technique s'est produite, merci de contacter le support.`,
          code: status,
        };
    }
  }

  static handleOffLineAndUnauthentifiedEventOptions(
    error: any
  ): CreateEventOptions {
    const options: CreateEventOptions = {
      error,
      severity:
        !navigator.onLine || (error && error.status === 401)
          ? GddWebappEventSeverity.DEBUG
          : undefined,
    };

    if (!navigator.onLine) {
      options.titleAppend = ' (Offline)';
    } else if (error && error.status === 401) {
      options.titleAppend = ' (Non authentifié)';
    } else if (
      error &&
      error.status === 200 &&
      error.message.startsWith('Http failure during parsing')
    ) {
      options.titleAppend = ' (Erreur FHM)';
      options.severity = GddWebappEventSeverity.FATAL;
    }
    return options;
  }
}
