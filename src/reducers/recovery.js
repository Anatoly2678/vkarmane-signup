import { combineReducers } from 'redux'
import { createAction, handleActions } from 'redux-actions'
import fetch from 'isomorphic-fetch'

export const changePhoneNumber = createAction('CHANGE_PHONE_NUMBER')
export const requestCode = createAction('REQUEST_CODE')
export const invalidNumber = createAction('INVALID_NUMBER')
export const receiveCodeId = createAction('RECEIVE_CODE_ID')
export const requestConfirmation = createAction('REQUEST_CONFIRMATION')
export const codeConfirmed = createAction('SUCCESS_CONFIRMATION')
export const failConfirmation = createAction('FAIL_CONFIRMATION')
export const requestChangePassword = createAction('REQUEST_CHANGE_PASSWORD')
export const failChangePassword = createAction('FAIL_CHANGE_PASSWORD')
export const passwordEmpty = createAction('PASSWORD_EMPTY')

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
                dispatch(invalidNumber(result.Message))
            }
        }).catch(ex =>
            console.error(ex))
    }
}

export const confirmCode = code => {
    return (dispatch, getState) => {
        dispatch(requestConfirmation(code))

        return post('/Recovery.aspx/VerifyCodeForPasswordChange', {
            codeId: getState().phone.codeId,
            code
        }).then(response =>{
            return response.json()
        }).then(json => {
            const result = JSON.parse(json.d).VerifyCodeForPasswordChangeResult

            if(result.Code == 0) {
                dispatch(codeConfirmed())
                return
            }

            if(result.MaxAttemptsReached) {
                dispatch(failConfirmation('Превышено максимальное к-ство попыток'))
                return
            }

            if(result.CodeExpired) {
                dispatch(failConfirmation('Время жизни кода истекло'))
                return
            }

            dispatch(failConfirmation('Неправильный код подтверждения'))
        }).catch(ex =>
            console.error(ex))
    }
}

export const changePassword = ({pass, repeat}) => {
    return (dispatch, getState) => {
        if(pass.trim().length == 0) {
            dispatch(passwordEmpty(true))
            return
        }

        dispatch(passwordEmpty(false))

        if(pass !== repeat) {
            dispatch(failChangePassword('Пароль повторен неправильно'))
            return
        }

        dispatch(requestChangePassword())

        const state = getState()
        return post('/Recovery.aspx/ChangePassword', {
            code: state.verification.code,
            codeId: state.phone.codeId,
            password: pass,
            type: 'phone'
        }).then(response => {
            return response.json()
        }).then(json => {
            const result = JSON.parse(json.d).ChangePasswordResult

            if (result.Code == 0) {
                location.replace('signin.html');
            } else {
                dispatch(failChangePassword(result.Message))
            }
        }).catch(ex =>
            console.error(ex))
    }
}

const phone = handleActions({
    [changePhoneNumber] (state, action) {
        return {
            ...state,
            number: action.payload,
            message: ''
        }
    },

    [requestCode] (state) {
        return {
            ...state,
            waiting: true
        }
    },

    [invalidNumber] (state, action) {
        return {
            ...state,
            message: action.payload,
            waiting: false
        }
    },

    [receiveCodeId] (state, action) {
        return {
            ...state,
            codeId: action.payload,
            waiting: false
        }
    }

}, {
    number: '+7(913) 483 - 38 - 9_',
    sent: false,
    message: '',
    codeId: '',
    waiting: false
})

const verification = handleActions({
    [requestConfirmation]: (state, action) => ({
        ...state,
        waiting: true,
        code: action.payload
    }),
    [codeConfirmed]: (state) => ({
        ...state,
        waiting: false,
        confirmed: true,
        message: ''
    }),
    [failConfirmation]: (state, action) => ({
        ...state,
        waiting: false,
        message: action.payload
    })

}, {
    code: '',
    confirmed: false,
    message: '',
    waiting: false
})

const password = handleActions({
    [failChangePassword]: (state, action) => ({
        ...state,
        message: action.payload
    }),

    [passwordEmpty] (state, action) {
        return {
            ...state,
            trySendEmpty: action.payload
        }
    }
}, {
    trySendEmpty: false,
    message: '',
})

export default combineReducers({ phone, verification, password })

