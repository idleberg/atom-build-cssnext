import { configSchema, getConfig } from './config';
import { satisfyDependencies } from 'atom-satisfy-dependencies';
import { spawnSync } from 'child_process';
import { which } from './util';
import meta from '../package.json';

export { configSchema as config };

export function provideBuilder() {
  return class CssnextProvider {
    constructor(cwd) {
      this.cwd = cwd;
    }

    getNiceName() {
      return 'postcss-cssnext';
    }

    isEligible() {
      if (atom.config.get(meta.name + '.alwaysEligible') === true) {
        return true;
      }

      const cmd = spawnSync(which(), ['postcss']);
      if (!cmd.stdout.toString()) {
        return false;
      }

      return true;
    }

    settings() {
      const outputFile = getConfig('outputFile');
      const errorMatch = [
        '(?<file>([^:]+)):(?<line>\\d+):(?<col>\\d+): (?<message>.+)'
      ];

      return [
        {
          name: 'cssnext',
          exec: 'postcss',
          args: [ '--use', 'postcss-cssnext', '{FILE_ACTIVE}', '--output', outputFile ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          keymap: 'cmd-alt-b',
          atomCommandName: 'cssnext:compile',
          errorMatch: errorMatch
        },
        {
          name: 'cssnext --map',
          exec: 'postcss',
          args: [ '--use', 'postcss-cssnext', '{FILE_ACTIVE}', '--output', outputFile, '--no-map.inline' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          keymap: 'cmd-alt-b',
          atomCommandName: 'cssnext:compile-with-map',
          errorMatch: errorMatch
        },
        {
          name: 'cssnext --watch',
          exec: 'postcss',
          args: [ '--use', 'postcss-cssnext', '{FILE_ACTIVE}', '--output', outputFile, '--watch' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          keymap: 'cmd-alt-b',
          atomCommandName: 'cssnext:compile-and-watch',
          errorMatch: errorMatch
        },
        {
          name: 'cssnext --map --watch',
          exec: 'postcss',
          args: [ '--use', 'postcss-cssnext', '{FILE_ACTIVE}', '--output', outputFile, '--no-map.inline', '--watch' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          keymap: 'cmd-alt-b',
          atomCommandName: 'cssnext:compile-with-map-and-watch',
          errorMatch: errorMatch
        }
      ];
    }
  };
}

// This package depends on build, make sure it's installed
export function activate() {
  if (getConfig('manageDependencies') === true) {
    satisfyDependencies(meta.name);
  }
}
