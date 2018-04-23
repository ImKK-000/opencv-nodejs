import cv from 'opencv4nodejs'
import path from 'path'

(async () => {
  const fileName = path.join(__dirname, 'files', 'input', 'original.png')
  const outputFileName = path.join(__dirname, 'files', 'output', 'output.png')

  const [angle] = [50]

  const mat = await cv.imread(fileName)
  const { rows: w, cols: h } = mat
  const [cX, cY] = [w / 2, h / 2]
  const centerPoint = new cv.Point2(cX, cY)

  const M = cv.getRotationMatrix2D(centerPoint, angle, 1.0)
  const cos = Math.abs(M.at(0, 0))
  const sin = Math.abs(M.at(0, 1))
  const nW = Math.floor((h * sin) + (w * cos))
  const nH = Math.floor((h * cos) + (w * sin))
  const nSize = new cv.Size(nW, nH)

  M.set(0, 2, M.at(0, 2) + (nW / 2) - cX)
  M.set(1, 2, M.at(1, 2) + (nH / 2) - cY)

  const newMat = mat.warpAffine(M, nSize)
  const src = newMat
  const tmp = new cv.Mat(w, h, cv.CV_8UC4, [255, 255, 255, 255])
    .cvtColor(cv.COLOR_BGR2GRAY)
    .warpAffine(M, nSize)

  const rgb = src.split()
  const alpha = tmp.threshold(0, 255, cv.THRESH_BINARY)
  const newMatTransparent = new cv.Mat([...rgb, alpha])

  cv.imwrite(outputFileName, newMatTransparent)
})()

export default {
  label: 'Rotate',
  type: 'RotateFunction',
  input: 1,
  fill: '#000',
  stroke: 'brown',
  description: 'Rotates an image around the origin (0,0) and then shifts it.',
  settings: {
    angle: {
      defaultValue: 0,
      description: 'Angle of rotation in degrees.',
    },
  }
}
