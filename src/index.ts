import { Stream } from 'xstream'

export type DrawFunction = (x: number, y: number) => number[]

export type CanvasPointsDrawer = {
  canvas: HTMLCanvasElement,
  draw: DrawFunction
}

export default function canvasPointsDriver (canvasPoints$: Stream<CanvasPointsDrawer>) {
  canvasPoints$.addListener({
    error: error => { console.error('canvasPointsDriver error:', error) },
    next: ({ canvas, draw }) => {
      if (!canvas) return null
      const width = parseInt(canvas.getAttribute('width'), 10)
      const height = parseInt(canvas.getAttribute('height'), 10)

      const context = canvas.getContext('2d')
      const imageData = context.createImageData(width, height)
      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          const i = (x + y * width) * 4
          const [red, green, blue] = draw(x, y)

          imageData.data[i] = red
          imageData.data[i + 1] = green
          imageData.data[i + 2] = blue
          imageData.data[i + 3] = 255
        }
      }
      context.putImageData(imageData, 0, 0, 0, 0, width, height)
    }
  })
}
