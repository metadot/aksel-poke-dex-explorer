import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonErrorComponent } from './pokemon-error.component';

describe('PokemonErrorComponent', () => {
  let component: PokemonErrorComponent;
  let fixture: ComponentFixture<PokemonErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
