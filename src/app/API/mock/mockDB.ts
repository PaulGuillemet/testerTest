import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MockDb {
  public db: any = {
    pNetworks: [
      /*  {
        name: 'Bouygues Elec.',
        fluidType: 'PUBLIC',
        networkSensitivity: 'SENSITIVE',
        code: '008970',
        description: 'Réseau Bouygues électrique',
        enabled: true,
        privateNetworkId: '59d5b51f-cb00-3b8a-7f1e-c739da669f41',
      },
      {
        name: 'Orange TRC',
        fluidType: 'PRIVE',
        networkSensitivity: 'NOT_SENSITIVE',
        code: '',
        description: 'jmdqfs dslqmjf sqmdf klmsdq flj dsq lf jds lkfmsdqkl f',
        enabled: true,
        privateNetworkId: '25a75a17-6b4e-7871-53bf-5516ec75d770',
      },
      {
        name: 'Free Mob.',
        fluidType: 'PRIVE',
        networkSensitivity: 'NOT_SENSITIVE',
        code: '0055674',
        description: 'Free Mobile',
        enabled: true,
        privateNetworkId: '25a75a17-6b4e-7871-53bf-5516ec75d770',
      }, */
    ],
  };
  constructor() {}
}
