import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';
import { ApiErrorDisplay } from 'src/app/model/models';
import {
  PrivateNetworkDto,
  FLUID_TYPE_LABELS,
  NETWORK_SENSITIVITY_LABELS,
  NETWORK_LOCATION_LABELS,
} from 'src/app/model/privateNetworkDto';
import { PrivateNetworksService } from './private-networks.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { PrivateNetworkFormComponent } from './private-network-form/private-network-form.component';
import { CustomAsyncDataSource } from 'src/app/API/mock/CustomAsyncDataSource';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-private-networks',
  templateUrl: './private-networks.component.html',
  styleUrls: ['./private-networks.component.scss'],
})
export class PrivateNetworksComponent implements OnInit, AfterViewInit {
  public errorDisplay: ApiErrorDisplay;
  public searchText: string = '';
  public displayedColumns = [
    'name',
    'fluidType',
    'networkSensitivity',
    'code',
    'description',
  ];
  public dataSource: CustomAsyncDataSource<PrivateNetworkDto>;
  public isEnabledTab: boolean = true;
  public fluidTypeLabels = FLUID_TYPE_LABELS;
  public networkSensitivityLabels = NETWORK_SENSITIVITY_LABELS;
  public networkLocationLabels = NETWORK_LOCATION_LABELS;
  public numberOfResults: number = 0;

  public onFirefox: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  private clearSort() {
    if (!this.sort) {
      return;
    }
    this.sort.sort({
      id: '',
      start: '',
      disableClear: false,
    });
  }

  constructor(
    public privateNetworkservice: PrivateNetworksService,
    public toasterService: ToasterService,
    public dialog: MatDialog
  ) {}

  detectBrowserName() {
    const agent = window.navigator.userAgent.toLowerCase();
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
  }

  async ngOnInit(): Promise<void> {
    this.onFirefox = this.detectBrowserName() == 'firefox';
    this.dataSource = new CustomAsyncDataSource<PrivateNetworkDto>(
      (query, enabled, pageIndex = 0, pageSize = 200) =>
        this.privateNetworkservice.getPrivateNetworks(
          query,
          enabled,
          pageIndex,
          pageSize
        )
    );
    this.refreshPrivateNetworks();

    this.dataSource.numberOfResults$.subscribe(
      (nb) => (this.numberOfResults = nb)
    );

    this.dataSource.errorDisplay$.subscribe((val) => (this.errorDisplay = val));
  }

  ngAfterViewInit() {
    this.paginator.page.pipe(tap(() => this.loadElms())).subscribe();
  }

  loadElms() {
    this.dataSource.load(
      this.searchText,
      this.isEnabledTab,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }

  public async refreshPrivateNetworks() {
    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }
    this.dataSource.load(
      this.searchText,
      this.isEnabledTab,
      0,
      this.paginator?.pageSize || 200
    );
    this.clearSort();
  }

  public openEditionDialog(elm?: PrivateNetworkDto) {
    this.dialog
      .open(PrivateNetworkFormComponent, {
        data: {
          isCreation: !elm,
          privateNetwork: elm,
          otherPrivateNetworkNames: [],
          // this.privateNetworks
          //   .map((lp) => lp.name)
          //   .filter((code) => code !== elm?.name),
        },
      })
      .componentInstance.updated.subscribe(() => {
        this.toasterService.showToaster(
          'success',
          `Le réseau a été ${!elm ? 'créé' : 'modifié'}`
        );
        this.refreshPrivateNetworks();
      });
  }

  public setIsEnabledTab(val: boolean) {
    this.isEnabledTab = val;
    this.refreshPrivateNetworks();
  }

  public doSort(e) {
    // bug tri sur description ne marche pas
    if (e.active === 'description') {
      return;
    }

    //tri sur le nom par défaut
    if (!e.direction) {
      e = { active: 'name', direction: 'asc' };
    }

    const current = this.dataSource.elementsSubject.value;
    this.sortOnProp(current, e.active, e.direction);
    this.dataSource.elementsSubject.next(current);
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
