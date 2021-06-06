import { Request, Response, Express } from 'express'
import multer from 'multer'
import path from 'path'
import AppError from '../errors/AppError'
import genFilename from '../utils/genFilename'
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'

const storages = {
  local: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'public'),
    filename: (req, file, cb) => {
      cb(null, genFilename(file.originalname))
    }
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: process.env.S3_BUCKET || '',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      cb(null, genFilename(file.originalname))
    }
  })
}

const getFileInfo = {
  local: (file: Express.Multer.File) => {
    return [
      file.filename,
      `${process.env.APP_URL || 'http://localhost:3333'}/public/${
        file.filename
      }`
    ]
  },
  s3: (file: Express.MulterS3.File) => {
    return [file.key, file.location]
  }
}

const options: multer.Options = {
  storage: storages[process.env.STORAGE_TYPE || 'local']
}

function uploadMiddleware(req: Request, res: Response) {
  return new Promise<void>((resolve, reject) => {
    multer(options).single('file')(req, res, (err: any) => {
      if (err) {
        if (err.code && err.code === 'LIMIT_UNEXPECTED_FILE') {
          reject(new AppError(`"${err.field}" is not allowed.`))
        } else reject(err)
      } else if (!req.file) {
        reject(new AppError('"file" is required.'))
      } else {
        const [filename, url] = getFileInfo[
          process.env.STORAGE_TYPE || 'local'
        ](req.file)

        req.body.filename = filename
        req.body.url = url

        resolve()
      }
    })
  })
}

export default uploadMiddleware
