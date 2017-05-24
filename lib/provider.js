'use babel';

import { platform} from 'os';
import { spawnSync } from 'child_process';

// Package settings
import meta from '../package.json';
const outputFile = atom.config.get(meta.name + '.outputFile') || '{FILE_ACTIVE_NAME_BASE}.output.css';

export const config = {
  outputFile: {
    title: 'Output File',
    description: 'Specify the default name of the output file, supports [replacement](https://github.com/noseglid/atom-build#replacement) placeholders',
    type: 'string',
    'default': '{FILE_ACTIVE_NAME_BASE}.css',
    order: 0
  },
  manageDependencies: {
    title: 'Manage Dependencies',
    description: 'When enabled, third-party dependencies will be installed automatically',
    type: 'boolean',
    default: true,
    order: 1
  },
  alwaysEligible: {
    title: 'Always Eligible',
    description: 'The build provider will be available in your project, even when not eligible',
    type: 'boolean',
    default: false,
    order: 2
  }
};

// This package depends on build, make sure it's installed
export function activate() {
  if (atom.config.get(meta.name + '.manageDependencies') === true) {
    this.satisfyDependencies();
  }
}
export function which() {
  if (platform() === 'win32') {
    return 'where';
  }
  return 'which';
}

export function satisfyDependencies() {
  let k;
  let v;

  require('atom-package-deps').install(meta.name);

  const ref = meta['package-deps'];
  const results = [];

  for (k in ref) {
    if (typeof ref !== 'undefined' && ref !== null) {
      v = ref[k];
      if (atom.packages.isPackageDisabled(v)) {
        if (atom.inDevMode()) {
          console.log('Enabling package \'' + v + '\'');
        }
        results.push(atom.packages.enablePackage(v));
      } else {
        results.push(void 0);
      }
    }
  }
  return results;
}

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
