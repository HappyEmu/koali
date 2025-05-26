import * as migration_20250526_183620 from './20250526_183620';

export const migrations = [
  {
    up: migration_20250526_183620.up,
    down: migration_20250526_183620.down,
    name: '20250526_183620'
  },
];
