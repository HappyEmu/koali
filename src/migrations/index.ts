import * as migration_20250526_183620 from './20250526_183620';
import * as migration_20250526_191315 from './20250526_191315';

export const migrations = [
  {
    up: migration_20250526_183620.up,
    down: migration_20250526_183620.down,
    name: '20250526_183620',
  },
  {
    up: migration_20250526_191315.up,
    down: migration_20250526_191315.down,
    name: '20250526_191315'
  },
];
