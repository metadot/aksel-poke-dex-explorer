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

fdescribe('PokemonListComponent', () => {
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

  it('should render paginated Pokemon cards from allPokemons', fakeAsync(() => {
    fixture.componentRef.setInput('page', 0);
    fixture.componentRef.setInput('limit', 12);
    tick();
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

    component.allPokemons.set(mockData);

    tick();
    fixture.detectChanges();

    const cardTitles = fixture.debugElement.queryAll(By.css('.card-title'));
    expect(cardTitles.length).toBe(3);

    const text = cardTitles.map((el) => el.nativeElement.textContent.trim());
    expect(text).toEqual(['Bulbasaur', 'Ivysaur', 'Venusaur']);
  }));
});
