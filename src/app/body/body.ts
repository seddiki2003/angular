import { Component, signal } from '@angular/core';
import { Notifications } from '../notifications/notifications';

@Component({
  selector: 'app-body',
  imports: [Notifications],
  templateUrl: './body.html',
  styleUrl: './body.css'
})
export class Body {
  readonly amis = signal(['Ahmed', 'Sarra', 'Youssef', 'Mariem']);
}