import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferenceDetails } from './conference-details';

describe('ConferenceDetails', () => {
  let component: ConferenceDetails;
  let fixture: ComponentFixture<ConferenceDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConferenceDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(ConferenceDetails);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('conference', {
      title: 'Conférence de test',
      description: 'Description de test',
      date: new Date('2027-02-18T09:00:00'),
      place: 'Paris',
      maxParticipants: 10,
      nbParticipants: 2
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
