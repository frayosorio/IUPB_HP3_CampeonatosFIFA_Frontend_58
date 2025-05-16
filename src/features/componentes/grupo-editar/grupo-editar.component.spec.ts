import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoEditarComponent } from './grupo-editar.component';

describe('GrupoEditarComponent', () => {
  let component: GrupoEditarComponent;
  let fixture: ComponentFixture<GrupoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupoEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrupoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
