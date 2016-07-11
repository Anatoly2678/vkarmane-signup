import { combineReducers } from 'redux'
import { createAction, handleActions } from 'redux-actions'

export const changePhoneNumber = createAction('CHANGE_PHONE_NUMBER')
export const sendVerificationCode = createAction('SEND_VERIFICATION_CODE')
export const numberVerified = createAction('NUMBER_VERIFIED')
export const verificationAborted = createAction('VERIFICATION_ABORTED')
export const verificationFailed = createAction('VERIFICATION_FAILED')
export const changePassword = createAction('CHANGE_PASSWORD')

const phone = handleActions({
    [changePhoneNumber] (state, action) {
        const countDigits = text => (text.match(/\d/g) || []).length
        const digitsInPhone = 11

        return {
            ...state,
            number: action.payload,
            readyToCheck: countDigits(action.payload) === digitsInPhone
        }
    },

    [verificationFailed]: state => ({
        ...state,
        readyToCheck: false
    })
}, {
    number: '+7(913) 483 - 38 - 9_',
    readyToCheck: false
})

const verification = handleActions({
    [sendVerificationCode]: (state, action) => ({
        ...state,
        pending: true,
        number: action.payload,
        message: ''
    }),
    
    [numberVerified]: state => ({
        ...state,
        pending: false,
        verified: true,
        message: ''
    }),

    [verificationAborted]: state => ({
        ...state,
        pending: false,
        verified: false,
        message: ''
    }),

    [verificationFailed]: (state, action) => ({
        ...state,
        pending: false,
        verified: false,
        message: action.payload
    })
}, {
    pending: false,
    number: null,
    verified: false,
    message: ''
})

const password = handleActions({
    [changePassword]: (state, action) => ({
        ...state,
        repeatedIncorrectly: action.
    })
}, {
    value: '',
    confirmation: '',
    repeatedIncorrectly: false
})

export default combineReducers({ phone, verification, password })

