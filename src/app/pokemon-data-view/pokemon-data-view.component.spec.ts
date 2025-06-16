import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDataViewComponent } from './pokemon-data-view.component';

describe('PokemonDataViewComponent', () => {
  let component: PokemonDataViewComponent;
  let fixture: ComponentFixture<PokemonDataViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonDataViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
