# jest-meme-reporter

Turn your test results into memes! 😋

## Installation

```shell
npm install -D @mnatanbrito/jest-meme-reporter
```

## Important Notice

This reporter is intended for fun only. Given this restriction, it will only run in `development` (NODE_ENV=development) environments. I advise you not to replace 'default' reporter, just add 'jest-meme-reporter' as an additional reporter.

## Meme source

We use [Giphy](https://www.giphy.com) as the meme database.

## Usage

In your jest config add the following entry:

```JSON
{
  "reporters": [
    "default",
    [
      "<rootDir>/node_modules/@mnatanbrito/jest-meme-reporter/src/index.js", {
        "apiKey": "API_KEY"
      }
    ]
  ]
}
```

## Options

### apiKey: string

Api key generated on the `Giphy` dashboard.

```json
{
  "reporters": [["jest-meme-reporter", { "apiKey": "API_KEY_HERE" }]]
}
```

Then simply run:

```shell
jest
```

## Usage as testResultsProcessor

In your jest config add the following entry:

```JSON
{
  "testResultsProcessor": "jest-meme-reporter"
}
```

Then simply run:

```shell
jest
```

😋

![Jest meme reporter output](https://raw.githubusercontent.com/mnatanbrito/jest-meme-reporter/master/jest_meme_reporter_demo.gif "Jest meme reporter output")

<h2 align="center">Maintainers</h2>
<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://github.com/mnatanbrito.png?v=3&s=150">
        </br>
        <a href="https://github.com/mnatanbrito">Marcos Natan</a>
      </td>
    </tr>
  <tbody>
</table>

## Licence

MIT
