import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TimeDurationPipe } from './pipes/time-duration.pipe';


@NgModule({
  declarations: [
    TimeDurationPipe
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    TimeDurationPipe
  ]
})
export class SharedModule { }
