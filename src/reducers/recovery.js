import { combineReducers } from 'redux'
import assign from 'lodash/assign'

const phoneDefault = {
    number: '+7(913) 483 - 38 - 9_',
    readyToCheck: false,
    
}

const phone = (state = phoneDefault, action) => {
    switch (action.type) {
        case 'CHANGE_PHONE_NUMBER':
            const countDigits = text => (text.match(/\d/g) || []).length
            const digitsInPhone = 11

            return assign({}, state, {
                number: action.number,
                readyToCheck: countDigits(action.number) === digitsInPhone
            })

        case 'VERIFICATION_FAILED':
            return assign({}, state, {
                readyToCheck: false
            })

        default:
            return state
    }
}

const verificationDefault = {
    pending: false,
    number: null,
    verified: false,
    message: ''
}

const verification = (state = verificationDefault, action) => {
    switch (action.type) {
        case 'SEND_VERIFICATION_CODE':
            return assign({}, state, {
                pending: true,
                number: action.number,
                message: ''
            })

        case 'NUMBER_VERIFIED':
            return assign({}, state, {
                pending: false,
                verified: true,
                message: ''
            })

        case 'VERIFICATION_ABORTED':
            return assign({}, state, {
                pending: false,
                verified: false,
                message: ''
            })

        case 'VERIFICATION_FAILED':
            return assign({}, state, {
                pending: false,
                verified: false,
                message: action.message
            })

        default:
            return state
    }
}


export default combineReducers({ phone, verification })

