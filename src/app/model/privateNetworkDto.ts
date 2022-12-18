export interface PrivateNetworkDto {
  privateNetworkId?: string;
  enabled?: boolean;
  name?: string;
  code?: string;
  description?: string;
  fluidType?: FluidTypeEnum;
  networkLocation?: NetworkLocationEnum;
  networkSensitivity?: NetworkSensitivityEnum;
}

export enum FluidTypeEnum {
  PUBLIC = 'PUBLIC',
  PRIVE = 'PRIVE',
}

export const FLUID_TYPE_LABELS: { [key in FluidTypeEnum]: string } = {
  PUBLIC: 'Public',
  PRIVE: 'Privé',
};

export enum NetworkLocationEnum {
  AERIAL = 'AERIAL',
  UNDERGROUND = 'UNDERGROUND',
  AERIAL_AND_UNDERGROUND = 'AERIAL_AND_UNDERGROUND',
}

export const NETWORK_LOCATION_LABELS: { [key in NetworkLocationEnum]: string } =
  {
    AERIAL: 'Aérien',
    UNDERGROUND: 'Souterrain',
    AERIAL_AND_UNDERGROUND: 'Aérien et souterrain',
  };

export enum NetworkSensitivityEnum {
  NOT_SENSITIVE = 'NOT_SENSITIVE',
  SENSITIVE = 'SENSITIVE',
}

export const NETWORK_SENSITIVITY_LABELS: {
  [key in NetworkSensitivityEnum]: string;
} = {
  NOT_SENSITIVE: 'Non sensible',
  SENSITIVE: 'Sensible',
};
