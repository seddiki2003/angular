import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ConferenceList } from './conference-list';

describe('ConferenceList', () => {
  let component: ConferenceList;
  let fixture: ComponentFixture<ConferenceList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConferenceList],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ConferenceList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('filters past conferences and shows the availability state', () => {
    const element = fixture.nativeElement as HTMLElement;
    const buttons = element.querySelectorAll('button');
    const detailsLinks = element.querySelectorAll<HTMLAnchorElement>('.details-link');

    expect(component.upcomingConferences()).toHaveLength(4);
    expect(buttons).toHaveLength(4);
    expect(detailsLinks).toHaveLength(4);
    expect(detailsLinks[0].textContent?.trim()).toBe('Voir le détail');
    expect(detailsLinks[0].getAttribute('href')).toBe('/conference-detail/1');
    expect(buttons[0].classList.contains('places-high')).toBe(true);
    expect(buttons[1].classList.contains('places-low')).toBe(true);
    expect(buttons[2].classList.contains('places-none')).toBe(true);
    expect(buttons[2].textContent?.trim()).toBe('Complet');
    expect((buttons[2] as HTMLButtonElement).disabled).toBe(true);
  });

  it('registers a participant and recalculates the availability class', () => {
    const secondConference = component.upcomingConferences()[1];
    const secondButton = (fixture.nativeElement as HTMLElement).querySelectorAll('button')[1];

    secondButton.click();
    fixture.detectChanges();

    const updatedConference = component.conferenceList().find(
      (conference) => conference.title === secondConference.title
    );
    const updatedButton = (fixture.nativeElement as HTMLElement).querySelectorAll('button')[1];

    expect(updatedConference?.nbParticipants).toBe(74);
    expect(updatedButton.classList.contains('places-low')).toBe(true);
  });
});
