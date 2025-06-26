import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailedViewComponent } from './pokemon-detailed-view.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('PokemonDetailedViewComponent', () => {
  let component: PokemonDetailedViewComponent;
  let fixture: ComponentFixture<PokemonDetailedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonDetailedViewComponent],
      providers: [provideRouter([]), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetailedViewComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('name', 'giratina');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
