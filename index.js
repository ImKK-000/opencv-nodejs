import cv from 'opencv'
import path from 'path'

const fileName = path.resolve(__dirname, 'files', 'tux_profile.png')
const outputFileName = path.resolve(__dirname, 'files', 'output.png')

cv.readImage(fileName, (err, im) => {
  // process before rotate
  const angle = 45
  const [height, width] = im.size()
  const [halfHeight, halfWidth] = [height / 2, width / 2]

  const rotMat = cv.Matrix.getRotationMatrix2D(-angle, halfWidth, halfHeight, 1.0)
  const rotCos = Math.abs(rotMat.get(0, 0))
  const rotSin = Math.abs(rotMat.get(0, 1))
  const [newHeight, newWidth] = [(height * rotCos) + (width * rotSin)]
  console.log(rotCos, rotSin)

  // complete custom image
  im.rotate(0)
  im.save(outputFileName)
})
