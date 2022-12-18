import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { cloneDeep, isEqual } from 'lodash';
import { of } from 'rxjs';
import {
  FLUID_TYPE_LABELS,
  NETWORK_SENSITIVITY_LABELS,
  NETWORK_LOCATION_LABELS,
  PrivateNetworkDto,
} from 'src/app/model/privateNetworkDto';
import { PrivateNetworksService } from '../private-networks.service';

@Component({
  selector: 'app-private-network-form',
  templateUrl: './private-network-form.component.html',
  styleUrls: ['./private-network-form.component.scss'],
})
export class PrivateNetworkFormComponent implements OnInit {
  public form: FormGroup;
  public isUpdateOngoing: boolean = false;
  public wasFormModified: boolean = false;
  public originalObject: any;
  public updated: EventEmitter<void> = new EventEmitter();
  public fluidTypeLabels = Object.entries(FLUID_TYPE_LABELS);
  public networkSensitivityLabels = Object.entries(NETWORK_SENSITIVITY_LABELS);
  public networkLocationLabels = Object.entries(NETWORK_LOCATION_LABELS);
  constructor(
    public dialogRef: MatDialogRef<PrivateNetworkFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      isCreation: boolean;
      privateNetwork: PrivateNetworkDto;
    },
    public privateNetworksService: PrivateNetworksService,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      name: ['', [Validators.required]],
      fluidType: ['PUBLIC', [Validators.required]],
      networkSensitivity: ['NOT_SENSITIVE', [Validators.required]],
      code: ['', [Validators.pattern('[0-9]*')]],
      description: [''],
      enabled: true,
    });
  }

  ngOnInit(): void {
    this.dialogRef.disableClose = true;

    if (!this.data.isCreation) {
      this.form.patchValue(this.data.privateNetwork);
      this.originalObject = cloneDeep(this.form.value);
    }

    this.form.valueChanges.subscribe((val) => {
      this.wasFormModified = !isEqual(this.originalObject, this.form.value);
    });
  }

  public onCancelClick() {
    this.dialogRef.close();
  }

  public async onValidateClick() {
    this.isUpdateOngoing = true;

    const callWrapper = this.data.isCreation
      ? await this.privateNetworksService.postPrivateNetwork(this.form.value)
      : await this.privateNetworksService.putPrivateNetwork(
          this.data.privateNetwork.privateNetworkId,
          this.form.value
        );
    if (!callWrapper.error) {
      this.updated.emit();

      this.dialogRef.close();
    }
    this.isUpdateOngoing = false;
  }
}
