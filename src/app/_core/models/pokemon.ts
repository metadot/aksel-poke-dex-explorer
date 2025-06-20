export interface Pokemon {
  abilities: {
    ability: NamedAPIResource;
    is_hidden: boolean;
    slot: number;
  }[];
  base_experience: number;
  cries: { latest: string; legacy: string };
  forms: NamedAPIResource[];
  game_indices: {
    game_index: number;
    version: NamedAPIResource;
  }[];
  height: number;
  held_items: {
    item: NamedAPIResource;
    version_details: {
      rarity: number;
      version: NamedAPIResource;
    }[];
  }[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: {
    move: NamedAPIResource;
    version_group_details: {
      level_learned_at: number;
      move_learned_method: NamedAPIResource;
      order: number;
      version_group: NamedAPIResource;
    }[];
  }[];
  name: string;
  order: number;
  past_abilities: {
    abilities: {
      ability: NamedAPIResource;
      is_hidden: boolean;
      slot: number;
    }[];
    generation: NamedAPIResource;
  }[];
  past_types: {
    generation: NamedAPIResource;
    types: {
      slot: number;
      type: NamedAPIResource;
    }[];
  }[];
  species: NamedAPIResource;
  sprites: {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
    other: {
      dream_world: {
        front_default: string;
        front_female: string;
      };
      home: {
        front_default: string;
        front_female: string;
        front_shiny: string;
        front_shiny_female: string;
      };
      'official-artwork': {
        front_default: string;
        front_shiny: string;
      };
      showdown: {
        back_default: string;
        back_female: string;
        back_shiny: string;
        back_shiny_female: string;
        front_default: string;
        front_female: string;
        front_shiny: string;
        front_shiny_female: string;
      };
    };
    versions: {
      'generation-i': {
        'red-blue': {
          back_default: string;
          back_gray: string;
          back_transparent: string;
          front_default: string;
          front_gray: string;
          front_transparent: string;
        };
        yellow: {
          back_default: string;
          back_gray: string;
          back_transparent: string;
          front_default: string;
          front_gray: string;
          front_transparent: string;
        };
      };
      'generation-ii': {
        crystal: {
          back_default: string;
          back_shiny: string;
          back_shiny_transparent: string;
          back_transparent: string;
          front_default: string;
          front_shiny: string;
          front_shiny_transparent: string;
          front_transparent: string;
        };
        gold: {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
          front_transparent: string;
        };
        silver: {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
          front_transparent: string;
        };
      };
      'generation-iii': {
        emerald: {
          front_default: string;
          front_shiny: string;
        };
        'firered-leafgreen': {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
        };
        'ruby-sapphire': {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
        };
      };
      'generation-iv': {
        'diamond-pearl': {
          back_default: string;
          back_female: string;
          back_shiny: string;
          back_shiny_female: string;
          front_default: string;
          front_female: string;
          front_shiny: string;
          front_shiny_female: string;
        };
        'heartgold-soulsilver': {
          back_default: string;
          back_female: string;
          back_shiny: string;
          back_shiny_female: string;
          front_default: string;
          front_female: string;
          front_shiny: string;
          front_shiny_female: string;
        };
        platinum: {
          back_default: string;
          back_female: string;
          back_shiny: string;
          back_shiny_female: string;
          front_default: string;
          front_female: string;
          front_shiny: string;
          front_shiny_female: string;
        };
      };
      'generation-v': {
        'black-white': {
          animated: {
            back_default: string;
            back_female: string;
            back_shiny: string;
            back_shiny_female: string;
            front_default: string;
            front_female: string;
            front_shiny: string;
            front_shiny_female: string;
          };
          back_default: string;
          back_female: string;
          back_shiny: string;
          back_shiny_female: string;
          front_default: string;
          front_female: string;
          front_shiny: string;
          front_shiny_female: string;
        };
      };
      'generation-vi': {
        'omegaruby-alphasapphire': {
          front_default: string;
          front_female: string;
          front_shiny: string;
          front_shiny_female: string;
        };
        'x-y': {
          front_default: string;
          front_female: string;
          front_shiny: string;
          front_shiny_female: string;
        };
      };
      'generation-vii': {
        icons: {
          front_default: string;
          front_female: string;
        };
        'ultra-sun-ultra-moon': {
          front_default: string;
          front_female: string;
          front_shiny: string;
          front_shiny_female: string;
        };
      };
      'generation-viii': {
        icons: {
          front_default: string;
          front_female: string;
        };
      };
    };
  };
  stats: { base_stat: number; effort: number; stat: NamedAPIResource }[];
  types: {
    slot: number;
    type: NamedAPIResource;
  }[];
  weight: number;
}

export interface PokemonSpecies {
  base_happiness: number;
  capture_rate: number;
  color: NamedAPIResource;
  egg_groups: NamedAPIResource[];
  evolution_chain: {
    url: string;
  };
  evolves_from_species: NamedAPIResource;
  flavor_text_entries: {
    flavor_text: string;
    language: NamedAPIResource;
    version: NamedAPIResource;
  }[];
  form_descriptions: {
    description: string;
    language: NamedAPIResource;
  };
  forms_switchable: boolean;
  gender_rate: number;
  genera: {
    genus: string;
    language: NamedAPIResource;
  }[];
  generation: NamedAPIResource;
  growth_rate: NamedAPIResource;
  habitat: NamedAPIResource;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: {
    language: NamedAPIResource;
    name: string;
  }[];
  order: number;
  pal_park_encounters: {
    area: NamedAPIResource;
    base_score: number;
    rate: number;
  }[];
  pokedex_numbers: {
    entry_number: number;
    pokedex: NamedAPIResource;
  }[];
  shape: NamedAPIResource;
  varieties: {
    is_default: boolean;
    pokemon: NamedAPIResource;
  }[];
}

export interface NamedAPIResource {
  name: string;
  url: string;
}
