import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { PokemonListComponent } from './pokemon-list.component';
import { provideRouter, Router } from '@angular/router';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { PokemonSpeciesList } from '../_core/models/pokemon';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListComponent],
      providers: [provideRouter([]), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
    router = TestBed.inject(Router);

    fixture.componentRef.setInput('page', 2);
    fixture.componentRef.setInput('limit', 12);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compute offset correctly', () => {
    expect(component.offset()).toBe(24);
  });

  it('should trigger navigation on page change', () => {
    const navigateSpy = spyOn(router, 'navigate');

    const mockEvent = {
      pageIndex: 3,
      pageSize: 24,
    } as any;

    component.onPageChanged(mockEvent);
    expect(navigateSpy).toHaveBeenCalledWith([], {
      queryParams: {
        page: 3,
        limit: 24,
      },
      queryParamsHandling: 'merge',
    });
  });

  it('should display loading message when pokemons are loading', fakeAsync(() => {
    component.pokemons.reload();
    tick();
    const loadingElement = fixture.debugElement.query(By.css('P.text-muted'));
    expect(loadingElement.nativeElement.textContent).toContain(
      'Loading Pokémon list...'
    );
  }));

  it('should render Pokemon cards if data is loaded', fakeAsync(() => {
    const mockData: PokemonSpeciesList = {
      results: [
        {
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
        },
        {
          name: 'ivysaur',
          url: 'https://pokeapi.co/api/v2/pokemon-species/2/',
        },
        {
          name: 'venusaur',
          url: 'https://pokeapi.co/api/v2/pokemon-species/3/',
        },
      ],
      count: 3,
      next: null,
      previous: null,
    };

    component.pokemons.set(mockData);
    tick();

    const cardTitles = fixture.debugElement.queryAll(By.css('.card-title'));
    expect(cardTitles.length).toBe(3);
    expect(cardTitles[0].nativeElement.textContent.trim()).toBe('Bulbasaur');
    expect(cardTitles[1].nativeElement.textContent.trim()).toBe('Ivysaur');
    expect(cardTitles[2].nativeElement.textContent.trim()).toBe('Venusaur');
  }));
});
