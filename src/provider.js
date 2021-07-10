import { configSchema, getConfig } from './config';
import { satisfyDependencies } from 'atom-satisfy-dependencies';
import Logger from './log';
import { name } from '../package.json';
import which from 'which';

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
      if (atom.config.get(name + '.alwaysEligible') === true) {
        return true;
      }

      if (which.sync('postcss', { nothrow: true })) {
        Logger.log('Build provider is eligible');
        return true;
      }

      Logger.error('Build provider isn\'t eligible');
      return false;
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

export function activate() {
  Logger.log('Activating package');

  // This package depends on build, make sure it's installed
  if (getConfig('manageDependencies') === true) {
    satisfyDependencies(name);
  }
}

export function deactivate() {
  Logger.log('Deactivating package');
}
