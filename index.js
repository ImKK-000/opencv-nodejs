import cv from 'opencv'
import path from 'path'

const fileName = path.resolve(__dirname, 'files', 'input', 'original.png')
const outputFileName = path.resolve(__dirname, 'files', 'output', 'output.png')

cv.readImage(fileName, (err, im) => {

})
