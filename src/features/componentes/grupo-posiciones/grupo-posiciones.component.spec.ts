import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoPosicionesComponent } from './grupo-posiciones.component';

describe('GrupoPosicionesComponent', () => {
  let component: GrupoPosicionesComponent;
  let fixture: ComponentFixture<GrupoPosicionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupoPosicionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrupoPosicionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
