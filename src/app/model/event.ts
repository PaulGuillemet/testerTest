export interface GddWebappEvent {
  id?: string; // ! Not in the android model, do not send to Mbaas
  name?: GddWebappEventType;
  category?: GddWebappEventCategory;
  severity?: GddWebappEventSeverity;
  title?: string;
  date?: Date;
  appVersion?: string;
  user?: string;
  message?: string;
  workspaceId?: string;
  device?: string;
  properties?: GddWebappEventCustomProperty[];
  provider?: EventProviderEnum;
  pushed?: boolean;
}

export interface GddWebappEventCustomProperty {
  name: string;
  value: string;
}

export enum GddWebappEventType {
  UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS',
  UPLOAD_CONSULTATION_SUCCESS = 'UPLOAD_CONSULTATION_SUCCESS',
  UPLOAD_CONSULTATION_FAIL = 'UPLOAD_CONSULTATION_FAIL',

  UPLOAD_WD_SUCCESS = 'UPLOAD_WD_SUCCESS',
  UPLOAD_WD_FAIL = 'UPLOAD_WD_FAIL',

  UPLOAD_FILE_FAIL = 'UPLOAD_FILE_FAIL',

  DOWNLOAD_FILE_FAIL = 'DOWNLOAD_FILE_FAIL',
  DB_PURGE_USER_ACTION = 'DB_PURGE_USER_ACTION',
  RESET_WS_FORGOT_PIN = 'RESET_WS_FORGOT_PIN',
  EVENT_DB_INIT = 'EVENT_DB_INIT',
  RESET_WS_USER_ACTION = 'RESET_WS_USER_ACTION',
  RESET_WS_USER_CHANGE = 'RESET_WS_USER_CHANGE',
  CREATE_WS = 'CREATE_WS',
  SEND_EVENTS_FAIL = 'SEND_EVENTS_FAIL',
  FAILED_TO_FETCH_REMOTE_CONF = 'FAILED_TO_FETCH_REMOTE_CONF',
  MISSING_REMOTE_CONF_PROPERTY = 'MISSING_REMOTE_CONF_PROPERTY',
  UNKNOWN = 'UNKNOWN',
}

export enum GddWebappEventCategory {
  BUSINESS = 'BUSINESS',
  DEBUG = 'DEBUG',
  TECHNICAL = 'TECHNICAL',
  UNKNOWN = 'UNKNOWN',
}

export enum GddWebappEventSeverity {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  FATAL = 'FATAL',
}

export interface EventsFilterParams {
  name?: string;
  date?: Date | string;
  severity?: string | string[];
  user?: string;
  appVersion?: string;
  dateEventAfter?: Date;
  dateEventBefore?: Date;
  dateStart?: string;
  dateEnd?: string;
}

export enum EventProviderEnum {
  GDD_FRONTEND = 'GDD_FRONTEND',
}

export interface EventTypeCategoryAndSeverity {
  title: string;
  severity: GddWebappEventSeverity;
  message: string;
}

export interface CreateEventOptions {
  error?: Error | string;
  severity?: GddWebappEventSeverity;
  titleAppend?: string;
}

export type EventTypeMap = {
  [key in GddWebappEventType]: EventTypeCategoryAndSeverity;
};

export const EVENT_TYPE_MAP: EventTypeMap = {
  UPLOAD_FILE_SUCCESS: {
    title: `Soumission d\'un fichier r??ussie`,
    severity: GddWebappEventSeverity.INFO,
    message: 'File with external UUID /$/externalUuid/$/ successfully uploaded',
  },
  //TODO
  UPLOAD_CONSULTATION_SUCCESS: {
    title: `Cr??ation d'une consultation r??ussie`,
    severity: GddWebappEventSeverity.INFO,
    message: 'Successfully created consultation /$/externalUuid/$/',
  },

  UPLOAD_WD_SUCCESS: {
    title: `Cr??ation d'une DT r??ussie`,
    severity: GddWebappEventSeverity.INFO,
    message: 'Successfully created WD /$/externalUuid/$/',
  },
  UPLOAD_FILE_FAIL: {
    title: `Erreur de soumission d\'un fichier`,
    severity: GddWebappEventSeverity.ERROR,
    message: '/$/messagePrecision/$/ (fichier: /$/filename/$/)',
  },
  DOWNLOAD_FILE_FAIL: {
    title: `Erreur de t??l??chargement d\'un fichier`,
    severity: GddWebappEventSeverity.ERROR,
    message: '/$/messagePrecision/$/ (fichier: /$/filename/$/)',
  },
  //TODO
  UPLOAD_CONSULTATION_FAIL: {
    title: `Echec de cr??ation d'une consultation`,
    severity: GddWebappEventSeverity.ERROR,
    message: 'Failed to create consultation /$/externalUuid/$/',
  },

  UPLOAD_WD_FAIL: {
    title: `Echec de cr??ation d'une DT`,
    severity: GddWebappEventSeverity.ERROR,
    message: 'Failed to create WD /$/externalUuid/$/',
  },

  DB_PURGE_USER_ACTION: {
    title: `Purge des donn??es locales`,
    severity: GddWebappEventSeverity.WARN,
    message: 'The application data was purged',
  },
  RESET_WS_FORGOT_PIN: {
    title: `Reinitialisation mot de passe oubli??`,
    severity: GddWebappEventSeverity.WARN,
    message: 'The application was reset because of forgotten code pin',
  },
  RESET_WS_USER_CHANGE: {
    title: `Reinitialisation changement d'utilisateur`,
    severity: GddWebappEventSeverity.WARN,
    message: 'The application was reset because of forgotten code pin',
  },
  RESET_WS_USER_ACTION: {
    title: `Reinitialisation manuelle`,
    severity: GddWebappEventSeverity.WARN,
    message: 'The application was reset by the user',
  },
  EVENT_DB_INIT: {
    title: `Initialisation de la base d\'??v??nement`,
    severity: GddWebappEventSeverity.INFO,
    message: 'The event database was initialized',
  },
  CREATE_WS: {
    title: `Cr??ation de l'espace de travail`,
    severity: GddWebappEventSeverity.INFO,
    message: 'Workspace was initialized',
  },
  SEND_EVENTS_FAIL: {
    title: `Erreur ?? l'envoi des ??v??nements`,
    severity: GddWebappEventSeverity.ERROR,
    message: 'An error occured while sending the events to the server',
  },
  UNKNOWN: {
    title: `??v??nement de type inconnu`,
    severity: GddWebappEventSeverity.ERROR,
    message: 'An unknown event occured',
  },

  FAILED_TO_FETCH_REMOTE_CONF: {
    title: `Impossible de r??cup??rer la configuration distante`,
    severity: GddWebappEventSeverity.ERROR,
    message: 'Could not fetch remote configuration',
  },
  MISSING_REMOTE_CONF_PROPERTY: {
    title: `Propri??t?? de configuration distante manquante`,
    severity: GddWebappEventSeverity.WARN,
    message:
      'The remote configuration property /$/property/$/ was not received',
  },
};
