import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisrutasComponent } from './misrutas.component';

describe('MisrutasComponent', () => {
  let component: MisrutasComponent;
  let fixture: ComponentFixture<MisrutasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisrutasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisrutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
