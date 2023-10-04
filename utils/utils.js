const generateOTP = () => {
    let otp = ''
    for (let i = 0; i <= 3; i++) {
        const randomVal = Math.round(Math.random() * 9)
        otp = otp + randomVal
    }
    return otp
}

export const PASS_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,24}$/;


export const utils = {
    generateOTP,
}

