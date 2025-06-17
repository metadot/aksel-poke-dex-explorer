import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailedViewComponent } from './pokemon-detailed-view.component';

describe('PokemonDetailedViewComponent', () => {
  let component: PokemonDetailedViewComponent;
  let fixture: ComponentFixture<PokemonDetailedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonDetailedViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetailedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
