import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sudden } from './sudden';

describe('Sudden', () => {
  let component: Sudden;
  let fixture: ComponentFixture<Sudden>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sudden]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sudden);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
