import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferanslarComponent } from './referanslar.component';

describe('ReferanslarComponent', () => {
  let component: ReferanslarComponent;
  let fixture: ComponentFixture<ReferanslarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferanslarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferanslarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
