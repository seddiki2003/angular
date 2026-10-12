import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { Conference } from '../conference.model';

@Component({
  selector: 'app-conference-details',
  imports: [DatePipe, UpperCasePipe],
  templateUrl: './conference-details.html',
  styleUrl: './conference-details.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConferenceDetails {
  readonly conference = input.required<Conference>();
}