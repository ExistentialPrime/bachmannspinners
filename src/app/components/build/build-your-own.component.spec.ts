import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildYourOwnComponent } from './build-your-own.component';

describe('BuildYourOwnComponent', () => {
  let component: BuildYourOwnComponent;
  let fixture: ComponentFixture<BuildYourOwnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildYourOwnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildYourOwnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
