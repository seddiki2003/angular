import { Injectable, signal } from '@angular/core';
import { Conference, ConferenceList } from './conference.model';

const dateFromToday = (dayOffset: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  return date;
};

@Injectable({ providedIn: 'root' })
export class ConferenceService {
  readonly conferenceList = signal<ConferenceList>([
    {
      id: 1,
      title: 'Angular et les interfaces réactives',
      description: 'Découvrez les nouveautés d’Angular et la programmation réactive.',
      date: dateFromToday(30),
      place: 'Paris',
      maxParticipants: 120,
      nbParticipants: 48
    },
    {
      id: 2,
      title: 'Concevoir des API robustes',
      description: 'Bonnes pratiques de conception et de sécurisation des API.',
      date: dateFromToday(90),
      place: 'Lyon',
      maxParticipants: 80,
      nbParticipants: 73
    },
    {
      id: 3,
      title: 'Design accessible',
      description: 'Créer des expériences numériques accessibles à toutes et tous.',
      date: dateFromToday(160),
      place: 'Marseille',
      maxParticipants: 60,
      nbParticipants: 60
    },
    {
      id: 4,
      title: 'Cloud et architectures distribuées',
      description: 'Panorama des architectures cloud modernes.',
      date: dateFromToday(300),
      place: 'Toulouse',
      maxParticipants: 150,
      nbParticipants: 102
    },
    {
      id: 5,
      title: 'Introduction au développement web',
      description: 'Conférence passée conservée dans les données de démonstration.',
      date: dateFromToday(-100),
      place: 'Bordeaux',
      maxParticipants: 100,
      nbParticipants: 64
    }
  ]);

  register(conferenceToUpdate: Conference): void {
    if (conferenceToUpdate.nbParticipants >= conferenceToUpdate.maxParticipants) {
      return;
    }

    this.conferenceList.update((conferences) =>
      conferences.map((conference) =>
        conference.id === conferenceToUpdate.id
          ? { ...conference, nbParticipants: conference.nbParticipants + 1 }
          : conference
      )
    );
  }
}
