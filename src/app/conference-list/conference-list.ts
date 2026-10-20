import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConferenceDetails } from '../conference-details/conference-details';
import { Conference } from '../conference.model';
import { ConferenceService } from '../conference.service';

@Component({
  selector: 'app-conference-list',
  imports: [ConferenceDetails, RouterLink],
  templateUrl: './conference-list.html',
  styleUrl: './conference-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConferenceList {
  private readonly conferenceService = inject(ConferenceService);
  private readonly today = new Date();

  readonly conferenceList = this.conferenceService.conferenceList;

  // computed() filtre la liste selon la date du jour et se recalcule quand le signal change.
  readonly upcomingConferences = computed(() =>
    this.conferenceList().filter((conference) => conference.date >= this.today)
  );

  remainingPlaces(conference: Conference): number {
    return conference.maxParticipants - conference.nbParticipants;
  }

  register(conferenceToUpdate: Conference): void {
    this.conferenceService.register(conferenceToUpdate);
  }
}