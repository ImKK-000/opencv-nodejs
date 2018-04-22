import cv from 'opencv4nodejs'
import path from 'path'

(async () => {
  const fileName = path.join(__dirname, 'files', 'input', 'original.png')
  const outputFileName = path.join(__dirname, 'files', 'output', 'output.png')

  const [rtype, alpha, beta] = [-1, 1, 0]
  const mat = await cv.imread(fileName)
  const newMat = mat.convertTo(rtype, alpha, beta)

  cv.imwrite(outputFileName, newMat)
})()
