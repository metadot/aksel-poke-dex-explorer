import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonCardComponent } from './pokemon-card.component';
import { provideRouter } from '@angular/router';
import { EventEmitter, signal } from '@angular/core';

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;

    const dummyResource = {
      value: () => undefined,
      isLoading: () => false,
      error: () => false,
    };

    fixture.componentRef.setInput('pokemon', dummyResource);
    fixture.componentRef.setInput('basePokemon', dummyResource);
    fixture.componentRef.setInput('pokemonSpecies', dummyResource);
    fixture.componentRef.setInput('selectedForm', undefined);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
