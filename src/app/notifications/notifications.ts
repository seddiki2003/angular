import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-notifications',
  imports: [],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Notifications {
  readonly notifications = signal([
    'Votre inscription à Angular Days est confirmée.',
    'Ahmed vous a invité à la conférence Web & Cloud.',
    'La conférence UX Design commence demain.'
  ]);
}
