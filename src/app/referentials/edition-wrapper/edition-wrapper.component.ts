import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edition-wrapper',
  templateUrl: './edition-wrapper.component.html',
  styleUrls: ['./edition-wrapper.component.scss'],
})
export class EditionWrapperComponent implements OnInit {
  @Input() isUpdateOngoing: boolean;
  @Input() isFullScreenDialog: boolean = false;
  @Input() wasFormModified: boolean = true;
  @Input() title?: string;
  @Input() confirmText: string = 'Confirmer';
  @Input() isConfirmDisabled: boolean = false;
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() confirm: EventEmitter<void> = new EventEmitter<void>();
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  public onCancelClick() {
    if (!this.isUpdateOngoing) {
      if (this.wasFormModified) {
        /* const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          disableClose: false,
          autoFocus: false,
          data: {
            title: 'Quitter la page',
            paragraphs: [
              'Etes-vous sûr de vouloir quitter la page ?',
              'Toutes les données saisies seront perdues.',
            ],
            cancelLabel: 'Annuler',
            confirmLabel: 'Fermer',
          },
        });
        dialogRef.componentInstance.decision.subscribe(async (confirm: any) => {
          if (confirm) {
            this.cancel.emit();
          }
          dialogRef.close();
        });
      } else {
        this.cancel.emit();
      } */
      }
    }
  }

  public onValidateClick() {
    if (!this.isConfirmDisabled && !this.isUpdateOngoing) {
      this.confirm.emit();
    }
  }
}
