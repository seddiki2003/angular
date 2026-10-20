import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ConferenceService } from '../conference.service';

@Component({
  selector: 'app-conference-detail',
  imports: [DatePipe, FormsModule],
  templateUrl: './conference-detail.html',
  styleUrl: './conference-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConferenceDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly conferenceService = inject(ConferenceService);

  readonly conferenceId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id'))),
    { initialValue: this.route.snapshot.paramMap.get('id') }
  );
  readonly conference = computed(() =>
    this.conferenceService
      .conferenceList()
      .find((conference) => conference.id === Number(this.conferenceId())) ?? null
  );

  // Chaque signal porte un état réactif utilisé directement par le template.
  readonly title = signal('Les nouveautés d’Angular');
  readonly speaker = signal('Amine Seddiki');
  readonly date = signal('2027-02-18');
  readonly places = signal(3);

  register(): void {
    this.places.update((places) => Math.max(0, places - 1));
  }
}
