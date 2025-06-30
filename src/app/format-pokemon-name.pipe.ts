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
  NAME_OVERRIDES = NAME_OVERRIDES;
  SPECIAL_NAMES = SPECIAL_NAMES;
  MODIFIER_MAP = MODIFIER_MAP;

  transform(name: string): string {
    if (!name) return '';

    if (this.NAME_OVERRIDES[name]) return this.NAME_OVERRIDES[name];

    const parts = name.split('-');
    const base = parts[0];
    const modifiers = parts.slice(1);

    if (
      modifiers.length === 2 &&
      modifiers[0] === 'mega' &&
      ['x', 'y'].includes(modifiers[1])
    ) {
      return `Mega ${this.capitalizeWord(base)} ${modifiers[1].toUpperCase()}`;
    }

    if (modifiers.length === 2 && modifiers[1] === 'striped') {
      return `${this.capitalizeWord(
        modifiers[0]
      )}-Striped ${this.capitalizeWord(base)}`;
    }

    const hasMappedModifier = modifiers.some((mod) =>
      this.MODIFIER_MAP.hasOwnProperty(mod)
    );

    if (hasMappedModifier || this.SPECIAL_NAMES.includes(base)) {
      const orderedParts = [...modifiers, base];
      const words = orderedParts.map(this.humanizeModifier);
      return words.join(' ');
    }

    const orderedParts = [base, ...modifiers];

    const words = orderedParts.map(this.humanizeModifier);
    return words.join('-');
  }

  private humanizeModifier = (mod: string): string => {
    return this.MODIFIER_MAP.hasOwnProperty(mod)
      ? this.MODIFIER_MAP[mod]
      : this.capitalizeWord(mod);
  };

  private capitalizeWord(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
