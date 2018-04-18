import cv from 'opencv'
import path from 'path'

const fileName = path.resolve(__dirname, 'files', 'input', 'original.png')
const outputFileName = path.resolve(__dirname, 'files', 'output', 'outputZoom.png')

cv.readImage(fileName, (err, im) => {
  const zoom = 100
  const [h, w] = im.size()
  let nW = w + (w * zoom / 100)
  let nH = h + (h * zoom / 100)

  if (nW <= 0) nW = 1
  if (nH <= 0) nH = 1

  im.resize(nW, nH)
  im.save(outputFileName)
})
