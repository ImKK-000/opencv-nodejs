import cv from 'opencv'
import path from 'path'

const fileName = path.resolve(__dirname, 'files', 'tux_profile.png')
const outputFileName = path.resolve(__dirname, 'files', 'output.png')

cv.readImage(fileName, (err, img) => {
  img.rotate(45)

  img.save(outputFileName)
})
