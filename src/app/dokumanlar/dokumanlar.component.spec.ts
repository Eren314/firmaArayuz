import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DokumanlarComponent } from './dokumanlar.component';

describe('DokumanlarComponent', () => {
  let component: DokumanlarComponent;
  let fixture: ComponentFixture<DokumanlarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DokumanlarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DokumanlarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
