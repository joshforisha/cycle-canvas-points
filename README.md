# cycle-canvas-points

[![build](https://img.shields.io/travis/joshforisha/cycle-canvas-points.svg?maxAge=2592000?style=flat-square)](https://travis-ci.org/joshforisha/cycle-canvas-points)
[![npm](https://img.shields.io/npm/v/cycle-canvas-points.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/cycle-canvas-points)

A [Cycle.js](http://cycle.js.org) driver for writing imageData values to canvas elements.

## API

* [`canvasPointsDriver`](#canvasPointsDriver) (`default` export)

### <a id="canvasPointsDriver"></a> `canvasPointsDriver`

The expected `sink$` is a stream of objects with the following members:

* `canvas: HTMLCanvasElement` – A &lt;canvas&gt; element (likely selected from `sources.DOM`)
* `draw: (x: number, y: number) => number[]` – A function that accepts `x` and `y` numbers as coordinates, and returns an array of _three_ numbers that correspond to RGB color values (`0–255`).

## Example

```js
import canvasPointsDriver from 'cycle-canvas-points'
import { h } from '@cycle/dom'
import { run } from '@cycle/xstream-run'

function main (sources) {
  const testDraw$ = sources.select('canvas.test').elements()
    .map(canvas => ({ canvas, draw: (x, y) => [x, y, 0] }))

  const vdom$ = h('div', [
    h('canvas.test', { attrs: { height: 128, width: 256 } })
  ])

  return {
    DOM: vdom$,
    testCanvas: testDraw$
  }
}

run(main, {
  DOM: document.body,
  testCanvas: canvasPointsDriver
})
```
