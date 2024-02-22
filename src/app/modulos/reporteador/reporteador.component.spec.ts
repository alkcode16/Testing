import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteadorComponent } from './reporteador.component';

describe('ReporteadorComponent', () => {
  let component: ReporteadorComponent;
  let fixture: ComponentFixture<ReporteadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReporteadorComponent]
    });
    fixture = TestBed.createComponent(ReporteadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
