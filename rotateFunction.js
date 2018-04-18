import cv from 'opencv'
import path from 'path'
import sleep from 'sleep'

// Ref (rotate): https://www.pyimagesearch.com/2017/01/02/rotate-images-correctly-with-opencv-and-python/
// Ref (transparent): https://stackoverflow.com/questions/40527769/removing-black-background-and-make-transparent-from-grabcut-output-in-python-ope
const fileName = path.resolve(__dirname, 'files', 'input', 'original.png')
const outputFileName = path.resolve(__dirname, 'files', 'output', 'outputRotate.png')

for (let angle = 0; angle <= 360; angle += 15) {
  cv.readImage(fileName, cv.Constants.CV_LOAD_IMAGE_COLOR, (err, im) => {
    if (angle % 90 === 0) {
      im.rotate(angle)
      im.save(outputFileName)
      return
    }

    const [h, w] = im.size()
    const [cX, cY] = [w / 2, h / 2]

    const M = cv.Matrix.getRotationMatrix2D(angle, cX, cY, 1.0)
    const cos = Math.abs(M.get(0, 0))
    const sin = Math.abs(M.get(0, 1))
    const nW = Math.floor((h * sin) + (w * cos))
    const nH = Math.floor((h * cos) + (w * sin))

    M.set(0, 2, M.get(0, 2) + (nW / 2) - cX)
    M.set(1, 2, M.get(1, 2) + (nH / 2) - cY)

    im.warpAffine(M, nW, nH)

    const src = im
    const tmp = new cv.Matrix(h, w, cv.Constants.CV_8UC3, [255])

    tmp.convertGrayscale()
    tmp.warpAffine(M, nW, nH)

    const rgb = src.split()
    const alpha = tmp.threshold(0, 255)
    im.merge([...rgb, alpha])
    im.save(outputFileName)
  })

  sleep.msleep(750)
}
