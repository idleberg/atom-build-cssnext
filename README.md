# build-cssnext

[![apm](https://flat.badgen.net/apm/license/build-cssnext)](https://atom.io/packages/build-cssnext)
[![apm](https://flat.badgen.net/apm/v/build-cssnext)](https://atom.io/packages/build-cssnext)
[![apm](https://flat.badgen.net/apm/dl/build-cssnext)](https://atom.io/packages/build-cssnext)
[![CircleCI](https://flat.badgen.net/circleci/github/idleberg/atom-build-cssnext)](https://circleci.com/gh/idleberg/atom-build-cssnext)
[![David](https://flat.badgen.net/david/dev/idleberg/atom-build-cssnext)](https://david-dm.org/idleberg/atom-build-cssnext?type=dev)

[Atom Build](https://atombuild.github.io/) provider for `postcss-cssnext`, compiles cssnext. Supports the [linter](https://atom.io/packages/linter) package for error highlighting.

## Installation

### apm

Install `build-cssnext` from Atom's [Package Manager](http://flight-manual.atom.io/using-atom/sections/atom-packages/) or the command-line equivalent:

`$ apm install build-cssnext`

### Using Git

Change to your Atom packages directory:

**Windows**

```powershell
# Powershell
$ cd $Env:USERPROFILE\.atom\packages
```

```cmd
:: Command Prompt
$ cd %USERPROFILE%\.atom\packages
```

Clone repository as `build-cssnext`:

```bash
$ git clone https://github.com/idleberg/atom-build-cssnext build-cssnext
```

Inside the cloned directory, install Node dependencies:

```bash
$ yarn || npm install
```

You should now be setup to build the package:

```bash
$ yarn build || npm run build
```

## Usage

### Build

Before you can build, select an active target with your preferred build option.

Available targets:

* `cssnext` — compile script
* `cssnext --map` — compile script and create a map
* `cssnext --watch` — compile script and keep watching
* `cssnext --map --watch` — compile script, create a map and keep watching

Since output and input format are the same, it's recommended to pick a name (or location) for your output files. This can be specified in your `config.cson`, all [standard replacements](https://github.com/noseglid/atom-build#replacements) can be used:

```cson
"build-cssnext":
  outputFile: "dist/{FILE_ACTIVE_NAME}"
```

### Shortcuts

Here's a reminder of the default shortcuts you can use with this package:

**Select active target**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd> or <kbd>F7</kbd>

**Build script**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>B</kbd> or <kbd>F9</kbd>

**Jump to error**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>G</kbd> or <kbd>F4</kbd>

**Toggle build panel**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>V</kbd> or <kbd>F8</kbd>

## License

This work is licensed under the [The MIT License](LICENSE).
