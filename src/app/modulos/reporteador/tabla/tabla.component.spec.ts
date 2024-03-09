import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaComponent } from './tabla.component';

describe('TablaComponent', () => {
  let component: TablaComponent;
  let fixture: ComponentFixture<TablaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TablaComponent]
    });
    fixture = TestBed.createComponent(TablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
