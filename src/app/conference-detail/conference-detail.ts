import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-conference-detail',
  imports: [FormsModule],
  templateUrl: './conference-detail.html',
  styleUrl: './conference-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConferenceDetail {
  // Chaque signal porte un état réactif utilisé directement par le template.
  readonly title = signal('Les nouveautés d’Angular');
  readonly speaker = signal('Amine Seddiki');
  readonly date = signal('2027-02-18');
  readonly places = signal(3);

  register(): void {
    this.places.update((places) => Math.max(0, places - 1));
  }
}
