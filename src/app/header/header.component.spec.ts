import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {
  LIMIT_PAGE,
  DEFAULT_PAGE,
} from '../_core/constants/pagination.constants';
import { provideRouter } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have limitParam and pageParam initialized correctly', () => {
    expect(component.LIMIT_PAGE).toBe(LIMIT_PAGE);
    expect(component.DEFAULT_PAGE).toBe(DEFAULT_PAGE);
  });
});
