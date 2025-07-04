import { Pipe, PipeTransform } from '@angular/core';
import {
  MODIFIER_MAP,
  NAME_OVERRIDES,
  SPECIAL_NAMES,
} from './_core/constants/name-pipe.constants';

@Pipe({
  name: 'formatPokemonName',
})
export class FormatPokemonNamePipe implements PipeTransform {
  NAME_OVERRIDES = NAME_OVERRIDES; // names that will be treated differently than the rest
  SPECIAL_NAMES = SPECIAL_NAMES; // names that need to be modified following the same pattern (but attribute in front of base name) but that don't need to have any text modified
  MODIFIER_MAP = MODIFIER_MAP; // patterns that need to be modified through a Record

  transform(name: string): string {
    if (!name) return '';

    if (this.NAME_OVERRIDES[name]) return this.NAME_OVERRIDES[name]; // name overrides are the first thing to check since it prevents unnecessary processing

    const parts = name.split('-'); // splits the api names wich are separated by '-'
    const base = parts[0]; // the base name (the core pokemon name) is always in first position
    const modifiers = parts.slice(1); // therefore these are modifiers

    if (
      modifiers.length === 2 &&
      modifiers[0] === 'mega' &&
      ['x', 'y'].includes(modifiers[1])
    ) {
      return `Mega ${this.capitalizeWord(base)} ${modifiers[1].toUpperCase()}`; // handles a special case. ex: mewtwo-mega-x should be Mega Mewtwo X
    } // impossible with standard processing below hence the special processing

    if (modifiers.length === 2 && modifiers[1] === 'striped') {
      return `${this.capitalizeWord(
        modifiers[0]
      )}-Striped ${this.capitalizeWord(base)}`; // same here: basculin-white-striped should be White-Striped Basculin (with the '-') hence the special processing
    }

    const hasMappedModifier = modifiers.some((mod) =>
      this.MODIFIER_MAP.hasOwnProperty(mod)
    );

    if (hasMappedModifier || this.SPECIAL_NAMES.includes(base)) {
      // if current pokemon has mapped modifier or pokemon has special name, put the modifiers in front of the base name
      const orderedParts = [...modifiers, base];
      const words = orderedParts.map(this.humanizeModifier);
      return words.join(' ');
    }

    const orderedParts = [base, ...modifiers]; // if the pokemon didn't meet the previous criterion, it means the base name should stay before the modifiers
    // and that a '-' should join the two
    const words = orderedParts.map(this.humanizeModifier);
    return words.join('-');
  }

  private humanizeModifier = (mod: string): string => {
    return this.MODIFIER_MAP.hasOwnProperty(mod)
      ? this.MODIFIER_MAP[mod] // failsafe to allow for a smoother processing (that way all the modifiers and the base names can be processed in the same map function)
      : this.capitalizeWord(mod);
  };

  private capitalizeWord(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1); // function to emulate Angular's titlecase pipe
  }
}
