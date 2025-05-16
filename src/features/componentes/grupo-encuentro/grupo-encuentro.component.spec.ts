import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoEncuentroComponent } from './grupo-encuentro.component';

describe('GrupoEncuentroComponent', () => {
  let component: GrupoEncuentroComponent;
  let fixture: ComponentFixture<GrupoEncuentroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupoEncuentroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrupoEncuentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
