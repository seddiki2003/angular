import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { ConferenceService } from '../conference.service';

import { ConferenceDetail } from './conference-detail';

describe('ConferenceDetail', () => {
  let fixture: ComponentFixture<ConferenceDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConferenceDetail],
      providers: [
        {
          provide: ConferenceService,
          useValue: {
            conferenceList: () => [
              {
                id: 1,
                title: 'Angular et les interfaces réactives',
                description: 'Découvrez les nouveautés d’Angular.',
                date: new Date('2026-12-11T00:00:00.000Z'),
                place: 'Paris',
                maxParticipants: 120,
                nbParticipants: 48
              }
            ]
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '1' })
            },
            paramMap: of(convertToParamMap({ id: '1' }))
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConferenceDetail);
    await fixture.whenStable();
  });

  it('shows the conference selected from the list', () => {
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    expect(text).toContain('Angular et les interfaces réactives');
    expect(text).toContain('Découvrez les nouveautés d’Angular.');
    expect(text).toContain('Paris');
    expect(text).toContain('48');
    expect(text).toContain('120');
  });
});
