export const changePhoneNumber = (number) => {
    return {
        type: 'CHANGE_PHONE_NUMBER',
        number
    }
}

export const sendVerificationCode = (number) => {
    return {
        type: 'SEND_VERIFICATION_CODE',
        number
    }
}

export const numberVerified = () => {
    return {
        type: 'NUMBER_VERIFIED'
    }
}

export const verificationAborted = () => {
    return {
        type: 'VERIFICATION_ABORTED'
    }
}

export const verificationFailed = (message) => {
    return {
        type: 'VERIFICATION_FAILED',
        message
    }
}