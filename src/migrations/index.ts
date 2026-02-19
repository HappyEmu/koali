import * as migration_20250526_183620 from './20250526_183620';
import * as migration_20250526_191315 from './20250526_191315';
import * as migration_20250531_112918 from './20250531_112918';
import * as migration_20260219_194135 from './20260219_194135';

export const migrations = [
  {
    up: migration_20250526_183620.up,
    down: migration_20250526_183620.down,
    name: '20250526_183620',
  },
  {
    up: migration_20250526_191315.up,
    down: migration_20250526_191315.down,
    name: '20250526_191315',
  },
  {
    up: migration_20250531_112918.up,
    down: migration_20250531_112918.down,
    name: '20250531_112918',
  },
  {
    up: migration_20260219_194135.up,
    down: migration_20260219_194135.down,
    name: '20260219_194135'
  },
];
