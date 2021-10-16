import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParadaSolicitadaComponent } from './parada-solicitada.component';

describe('ParadaSolicitadaComponent', () => {
  let component: ParadaSolicitadaComponent;
  let fixture: ComponentFixture<ParadaSolicitadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParadaSolicitadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParadaSolicitadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
