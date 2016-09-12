'use babel';

import { install } from 'atom-package-deps';
import { exec } from 'child_process';

// Package settings
import meta from '../package.json';
const notEligible = `**${meta.name}**: \`postcss\` is not in your PATH`;
const outputFile = atom.config.get('build-cssnext.outputFile') || '{FILE_ACTIVE_NAME_BASE}.output.css';

// This package depends on build, make sure it's installed
export function activate() {
  if (!atom.inSpecMode()) {
    install(meta.name);
  }
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
      exec('postcss --version', function (error, stdout, stderr) {
        if (error !== null) {
          // No PostCSS installed
          if (atom.inDevMode()) atom.notifications.addError(notEligible, { detail: error, dismissable: true });
          return false;
        }
        if (atom.inDevMode()) atom.notifications.addInfo(`**${meta.name}**`, { detail: stdout, dismissable: false });
      });

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
