import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ReferentialAPIService } from 'src/app/API/mock/referentialAPI.service';
import { ApiCallWrapperService } from 'src/app/services/api-call-wrapper.service';
import { ApiCallWrapper } from 'src/app/model/apiCallWrapper';
import { PrivateNetworkDto } from 'src/app/model/privateNetworkDto';

@Injectable({
  providedIn: 'root',
})
export class PrivateNetworksService {
  constructor(
    public referentialApi: ReferentialAPIService,
    public callWrapper: ApiCallWrapperService
  ) {}

  public async getPrivateNetworks(
    query?: string,
    enabled?: boolean,
    pageIndex = 0,
    pageSize = 200
  ): Promise<ApiCallWrapper> {
    return this.callWrapper.makeApiCall(
      this.referentialApi.fetchPrivateNetworkUsingGET(
        query,
        enabled,
        pageIndex,
        pageSize
      ),
      'récupération des réseaux'
    );
  }

  public async postPrivateNetwork(
    privateNetwork: PrivateNetworkDto
  ): Promise<ApiCallWrapper> {
    return this.callWrapper.makeApiCall(
      this.referentialApi.createPrivateNetworkUsingPOST(privateNetwork),
      'création du réseau',
      true
    );
  }

  public async putPrivateNetwork(
    id: string,
    privateNetwork: PrivateNetworkDto
  ): Promise<ApiCallWrapper> {
    privateNetwork.privateNetworkId = id;
    return this.callWrapper.makeApiCall(of(), 'modification du réseau', true);
  }

  public privateNetworkWithNameDoesntExists(name: string): Observable<boolean> {
    return of(true);
    /* return this.referentialApi.privateNetworkExists(name).pipe(
      map((resp) => !resp.content),
      catchError((err) => {
        return of(true);
      })
    ); */
  }
}
