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
    title: `Soumission d\'un fichier réussie`,
    severity: GddWebappEventSeverity.INFO,
    message: 'File with external UUID /$/externalUuid/$/ successfully uploaded',
  },
  //TODO
  UPLOAD_CONSULTATION_SUCCESS: {
    title: `Création d'une consultation réussie`,
    severity: GddWebappEventSeverity.INFO,
    message: 'Successfully created consultation /$/externalUuid/$/',
  },

  UPLOAD_WD_SUCCESS: {
    title: `Création d'une DT réussie`,
    severity: GddWebappEventSeverity.INFO,
    message: 'Successfully created WD /$/externalUuid/$/',
  },
  UPLOAD_FILE_FAIL: {
    title: `Erreur de soumission d\'un fichier`,
    severity: GddWebappEventSeverity.ERROR,
    message: '/$/messagePrecision/$/ (fichier: /$/filename/$/)',
  },
  DOWNLOAD_FILE_FAIL: {
    title: `Erreur de téléchargement d\'un fichier`,
    severity: GddWebappEventSeverity.ERROR,
    message: '/$/messagePrecision/$/ (fichier: /$/filename/$/)',
  },
  //TODO
  UPLOAD_CONSULTATION_FAIL: {
    title: `Echec de création d'une consultation`,
    severity: GddWebappEventSeverity.ERROR,
    message: 'Failed to create consultation /$/externalUuid/$/',
  },

  UPLOAD_WD_FAIL: {
    title: `Echec de création d'une DT`,
    severity: GddWebappEventSeverity.ERROR,
    message: 'Failed to create WD /$/externalUuid/$/',
  },

  DB_PURGE_USER_ACTION: {
    title: `Purge des données locales`,
    severity: GddWebappEventSeverity.WARN,
    message: 'The application data was purged',
  },
  RESET_WS_FORGOT_PIN: {
    title: `Reinitialisation mot de passe oublié`,
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
    title: `Initialisation de la base d\'évènement`,
    severity: GddWebappEventSeverity.INFO,
    message: 'The event database was initialized',
  },
  CREATE_WS: {
    title: `Création de l'espace de travail`,
    severity: GddWebappEventSeverity.INFO,
    message: 'Workspace was initialized',
  },
  SEND_EVENTS_FAIL: {
    title: `Erreur à l'envoi des évènements`,
    severity: GddWebappEventSeverity.ERROR,
    message: 'An error occured while sending the events to the server',
  },
  UNKNOWN: {
    title: `Évènement de type inconnu`,
    severity: GddWebappEventSeverity.ERROR,
    message: 'An unknown event occured',
  },

  FAILED_TO_FETCH_REMOTE_CONF: {
    title: `Impossible de récupérer la configuration distante`,
    severity: GddWebappEventSeverity.ERROR,
    message: 'Could not fetch remote configuration',
  },
  MISSING_REMOTE_CONF_PROPERTY: {
    title: `Propriété de configuration distante manquante`,
    severity: GddWebappEventSeverity.WARN,
    message:
      'The remote configuration property /$/property/$/ was not received',
  },
};
