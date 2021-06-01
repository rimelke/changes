import { customAlphabet } from 'nanoid'
const alphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

const genFilenameId = customAlphabet(alphabet, 10)

function genFilename(originalName: string) {
  return `${new Date()
    .toISOString()
    .replace(/\D/g, '')}_${genFilenameId()}${originalName.slice(
    originalName.lastIndexOf('.')
  )}`
}

export default genFilename
