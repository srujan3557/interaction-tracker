import { NgModule } from '@angular/core';
import {
    MatDialogModule,
    MatToolbarModule,
    MatMenuModule,
    MatExpansionModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatStepperModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatListModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule
  } from '@angular/material';

import { DragDropModule } from '@angular/cdk/drag-drop';

const material = [
  MatDialogModule,
  MatToolbarModule,
  MatMenuModule,
  MatExpansionModule,
  MatCardModule,
  MatTabsModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatIconModule,
  MatProgressBarModule,
  MatStepperModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatDividerModule,
  MatListModule,
  MatSlideToggleModule,
  DragDropModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRadioModule
];
@NgModule({
  imports: [
   ...material
  ],
  exports: [
   ...material
  ],
})
export class CustomMaterialModule { }
