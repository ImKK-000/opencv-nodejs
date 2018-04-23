import cv from 'opencv4nodejs'
import path from 'path'

(async () => {
  const fileName = path.join(__dirname, 'files', 'input', 'original.png')
  const outputFileName = path.join(__dirname, 'files', 'output', 'output.png')

  const [thresh, maxVal, type] = [0, 99, cv.THRESH_BINARY]
  const mat = await cv.imread(fileName)

  const threshold = mat.threshold(thresh, maxVal, type)
  cv.imwrite(outputFileName, threshold)
})()

export default {
  label: 'Threshold',
  type: 'ThresholdFunction',
  input: 1,
  fill: '#000',
  stroke: 'brown',
  description: 'Applies a fixed-level threshold to each array element.',
  settings: {
    thresh: {
      defaultValue: 0,
      description: 'Threshold value.'
    },
    maxval: {
      defaultValue: 0,
      description: 'maximum value to use with the THRESH_BINARY and THRESH_BINARY_INV thresholding types.'
    },
    type: {
      defaultValue: 'THRESH_BINARY',
      description: 'type of the threshold operation'
    }
  }
}
