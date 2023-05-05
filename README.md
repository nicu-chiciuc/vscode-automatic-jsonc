# Automatic JSONC

Automatic JSONC is a Visual Studio Code extension that automatically converts JSONC files (JSON with comments) to standard JSON files based on user-configured glob patterns.

## Features

This extension processes JSONC files that match the user-configured glob patterns and converts them to JSON files upon save. This allows you to work with JSONC for your configurations while maintaining compatibility with tools and parsers that require standard JSON files.

By default, the extension targets `package.jsonc` files and converts them to `package.json` files.

## Requirements

There are no additional requirements to use this extension. However, you will need to have the `micromatch` package installed as a dependency. You can do this by running `npm install micromatch`.

## Extension Settings

This extension includes the following configurable setting:

* `automatic-transform-jsonc`: An array of glob patterns for files to automatically convert from JSONC to JSON. Default value is `["**/package.jsonc"]`.

## Known Issues

There are no known issues at the moment. If you encounter any issues, please report them on the [GitHub repository](https://github.com/your-github-username/automatic-jsonc).

## Release Notes

### 0.1.0

- Added user-facing configuration option "automatic-transform-jsonc" to allow specifying an array of glob patterns for files that should be automatically converted from JSONC to JSON.

### 0.0.1

Initial release of Automatic JSONC.
