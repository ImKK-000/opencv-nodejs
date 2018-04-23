import cv from 'opencv4nodejs'
import path from 'path'

(async () => {
  const fileName = path.join(__dirname, 'files', 'input', 'original.png')
  const outputFileName = path.join(__dirname, 'files', 'output', 'output.png')

  const img = await cv.imread(fileName)

  // single axis for 1D hist
  const getHistAxis = channel => ([
    {
      channel,
      bins: 256,
      ranges: [0, 256]
    }
  ]);

  const grayImg = img.bgrToGray();
  const grayHist = cv.calcHist(grayImg, getHistAxis(0));
  const grayHistPlot = new cv.Mat(300, 600, cv.CV_8UC3, [255, 255, 255]);
  cv.plot1DHist(grayHist, grayHistPlot, new cv.Vec(0, 0, 0));

  cv.imwrite(outputFileName, plot)
})()

export default {
  label: 'Grayscale Histogram',
  type: 'GrayscaleHistogramFunction',
  input: 1,
  fill: '#000',
  stroke: 'brown',
  description: 'Calculates a histogram of a set of arrays.',
  settings: {}
}
