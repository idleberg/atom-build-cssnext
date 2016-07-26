# build-cssnext

[![apm](https://img.shields.io/apm/l/build-cssnext.svg?style=flat-square)](https://atom.io/packages/build-cssnext)
[![apm](https://img.shields.io/apm/v/build-cssnext.svg?style=flat-square)](https://atom.io/packages/build-cssnext)
[![apm](https://img.shields.io/apm/dm/build-cssnext.svg?style=flat-square)](https://atom.io/packages/build-cssnext)
[![Travis](https://img.shields.io/travis/idleberg/atom-build-cssnext.svg?style=flat-square)](https://travis-ci.org/idleberg/atom-build-cssnext)
[![David](https://img.shields.io/david/idleberg/atom-build-cssnext.svg?style=flat-square)](https://david-dm.org/idleberg/atom-build-cssnext#info=dependencies)
[![David](https://img.shields.io/david/dev/idleberg/atom-build-cssnext.svg?style=flat-square)](https://david-dm.org/idleberg/atom-build-cssnext#info=devDependencies)

[Atom Build](https://atombuild.github.io/) provider for `postcss-cssnext`, compiles cssnext. Supports the [linter](https://atom.io/packages/linter) package for error highlighting.

## Installation

### apm

Install `build-cssnext` from Atom's [Package Manager](http://flight-manual.atom.io/using-atom/sections/atom-packages/) or the command-line equivalent:

`$ apm install build-cssnext`

### GitHub

Change to your Atom packages directory:

```bash
# Windows
$ cd %USERPROFILE%\.atom\packages

# Linux & macOS
$ cd ~/.atom/packages/
```

Clone repository as `build-cssnext`:

```bash
$ git clone https://github.com/idleberg/atom-build-cssnext build-cssnext
```

## Usage

### Build

Before you can build, select an active target with your preferred build option.

Available targets:

* `cssnext` — compile script
* `cssnext --map` — compile script and create a map
* `cssnext --watch` — compile script and keep watching
* `cssnext --map --watch` — compile script, create a map and keep watching

Since output and input format are the same, it's recommended to pick a name (or location) for your output files. The name of the output file can be overridden in your `config.cson`, all [standard replacements](https://github.com/noseglid/atom-build#replacements) can be used:

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

This work is licensed under the [The MIT License](LICENSE.md).

## Donate

You are welcome support this project using [Flattr](https://flattr.com/submit/auto?user_id=idleberg&url=https://github.com/idleberg/atom-build-cssnext) or Bitcoin `17CXJuPsmhuTzFV2k4RKYwpEHVjskJktRd`
