import cv from 'opencv4nodejs'
import path from 'path'

(async () => {
  const fileName = path.join(__dirname, 'files', 'input', 'original.png')
  const outputFileName = path.join(__dirname, 'files', 'output', 'output.png')

  const rtype = -1
  const alpha = 3
  const beta = 150

  const mat = await cv.imread(fileName)
  const newMat = mat.convertTo(rtype, alpha, beta)

  cv.imwrite(outputFileName, newMat)
})()
