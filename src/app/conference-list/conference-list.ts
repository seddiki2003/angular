import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { ConferenceDetails } from '../conference-details/conference-details';
import { Conference, ConferenceList as ConferenceItems } from '../conference.model';

const dateFromToday = (dayOffset: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  return date;
};

@Component({
  selector: 'app-conference-list',
  imports: [ConferenceDetails],
  templateUrl: './conference-list.html',
  styleUrl: './conference-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConferenceList {
  private readonly today = new Date();

  // Le signal contient l'état réactif de la liste de conférences.
  readonly conferenceList = signal<ConferenceItems>([
    {
      title: 'Angular et les interfaces réactives',
      description: 'Découvrez les nouveautés d’Angular et la programmation réactive.',
      date: dateFromToday(30),
      place: 'Paris',
      maxParticipants: 120,
      nbParticipants: 48
    },
    {
      title: 'Concevoir des API robustes',
      description: 'Bonnes pratiques de conception et de sécurisation des API.',
      date: dateFromToday(90),
      place: 'Lyon',
      maxParticipants: 80,
      nbParticipants: 73
    },
    {
      title: 'Design accessible',
      description: 'Créer des expériences numériques accessibles à toutes et tous.',
      date: dateFromToday(160),
      place: 'Marseille',
      maxParticipants: 60,
      nbParticipants: 60
    },
    {
      title: 'Cloud et architectures distribuées',
      description: 'Panorama des architectures cloud modernes.',
      date: dateFromToday(300),
      place: 'Toulouse',
      maxParticipants: 150,
      nbParticipants: 102
    },
    {
      title: 'Introduction au développement web',
      description: 'Conférence passée conservée dans les données de démonstration.',
      date: dateFromToday(-100),
      place: 'Bordeaux',
      maxParticipants: 100,
      nbParticipants: 64
    }
  ]);

  // computed() filtre la liste selon la date du jour et se recalcule quand le signal change.
  readonly upcomingConferences = computed(() =>
    this.conferenceList().filter((conference) => conference.date >= this.today)
  );

  remainingPlaces(conference: Conference): number {
    return conference.maxParticipants - conference.nbParticipants;
  }

  register(conferenceToUpdate: Conference): void {
    if (this.remainingPlaces(conferenceToUpdate) <= 0) {
      return;
    }

    this.conferenceList.update((conferences) =>
      conferences.map((conference) =>
        conference === conferenceToUpdate
          ? { ...conference, nbParticipants: conference.nbParticipants + 1 }
          : conference
      )
    );
  }
}