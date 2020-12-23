import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideVerifyComponent } from './slide-verify.component';

describe('SlideVerifyComponent', () => {
  let component: SlideVerifyComponent;
  let fixture: ComponentFixture<SlideVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideVerifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
