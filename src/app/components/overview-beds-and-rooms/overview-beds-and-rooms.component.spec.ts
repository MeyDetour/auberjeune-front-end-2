import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewBedsAndRoomsComponent } from './overview-beds-and-rooms.component';

describe('OverviewBedsAndRoomsComponent', () => {
  let component: OverviewBedsAndRoomsComponent;
  let fixture: ComponentFixture<OverviewBedsAndRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewBedsAndRoomsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewBedsAndRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
