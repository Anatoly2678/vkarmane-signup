import { combineReducers } from 'redux'
import { createAction, handleActions } from 'redux-actions'
import fetch from 'isomorphic-fetch'

export const changePhoneNumber = createAction('CHANGE_PHONE_NUMBER')
export const requestCode = createAction('REQUEST_CODE')
export const failSendCode = createAction('FAIL_SEND_CODE')
export const receiveCodeId = createAction('RECEIVE_CODE_ID')
export const changePassword = createAction('CHANGE_PASSWORD')

const post = (url, data) =>
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

export const sendCode = (number) => {
    return dispatch => {
        dispatch(requestCode())

        return post('/Recovery.aspx/SendCodeForPasswordChange', {
            number,
            type: 'phone'
        }).then(response =>{
            return response.json()
        }).then(json => {
            const result = JSON.parse(json.d).SendCodeForPasswordChangeResult

            if(result.Code == 0) {
                dispatch(receiveCodeId(result.CodeId))
            } else {
                dispatch(failSendCode(result.Message))
            }
        }).catch(ex =>
            dispatch(failSendCode(ex.message || ex.Message || ex.toString())))
    }
}

const phone = handleActions({
    [changePhoneNumber] (state, action) {
        const countDigits = text => (text.match(/\d/g) || []).length
        const digitsInPhone = 11

        return {
            ...state,
            number: action.payload,
            readyToCheck: countDigits(action.payload) === digitsInPhone,
            sent: false
        }
    },

    [requestCode] (state) {
        return {
            ...state,
            sent: true
        }
    }
}, {
    number: '+7(913) 483 - 38 - 9_',
    readyToCheck: false,
    sent: false
})

const verification = handleActions({
    [requestCode]: state => ({
        ...state,
        sendingCode: true,
        codeId: '',
        code: '',
        message: '',
        verified: false,
    }),
    
    [receiveCodeId]: (state, action) => ({
        ...state,
        sendingCode: false,
        verified: true,
        codeId: action.payload
    }),

    [failSendCode]: (state, action) => ({
        ...state,
        sendingCode: false,
        message: action.payload
    })
}, {
    sendingCode: false,
    codeId: '',
    code: '',
    number: null,
    verified: false,
    message: ''
})

export default combineReducers({ phone, verification })

