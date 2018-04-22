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

export default {
  label: 'ConvertTo',
  type: 'ConvertToFunction',
  limitInput: 1,
  fill: '#000',
  stroke: 'brown',
  settings: {
    rtype: {
      defaultValue: -1,
      description: 'desired output matrix type or, rather, the depth since the number of channels are the same as the input has; if rtype is negative, the output matrix will have the same type as the input.'
    },
    alpha: {
      defaultValue: 1,
      description: 'optional scale factor.'
    },
    beta: {
      defaultValue: 0,
      description: 'optional delta added to the scaled values.'
    }
  }
}
