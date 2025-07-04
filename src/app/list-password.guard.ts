import { CanActivateFn } from '@angular/router';

export const listPasswordGuard: CanActivateFn = () => {
  const correctPassword = 'ilikepokemons';
  const entered = prompt(
    'Enter the secret password to access the Pokémon list:'
  );

  return entered === correctPassword;
};
