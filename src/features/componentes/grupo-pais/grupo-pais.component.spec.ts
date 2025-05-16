import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoPaisComponent } from './grupo-pais.component';

describe('GrupoPaisComponent', () => {
  let component: GrupoPaisComponent;
  let fixture: ComponentFixture<GrupoPaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupoPaisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrupoPaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
