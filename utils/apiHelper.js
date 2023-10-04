import * as crypto from "crypto";

const sendError = (res, error, status = 401) => {
    return res.status(status).json({message: error})
}

const sendSuccessResponse = (res, message,  data = {},status = 200) => {
    return res.status(status).json({
        data: data,
        message: message
    })
}

const createRandomBytes = () => new Promise((resolve, reject)=> {
    crypto.randomBytes(30, (err, buf) => {
        if (err){
            reject(err)
        }
        const randomBytes = buf.toString('hex')
        resolve(randomBytes)
    })
})

export const apiHelper = {
    sendError,
    sendSuccessResponse,
    createRandomBytes
}
