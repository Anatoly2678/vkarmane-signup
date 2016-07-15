import { combineReducers } from 'redux'
import { createAction, handleActions, handleAction } from 'redux-actions'
import fetch from 'isomorphic-fetch'

export const requestCode = createAction('REQUEST_CODE')
export const invalidNumber = createAction('INVALID_NUMBER')
export const receiveCodeId = createAction('RECEIVE_CODE_ID')
export const requestConfirmation = createAction('REQUEST_CONFIRMATION')
export const codeConfirmed = createAction('SUCCESS_CONFIRMATION')
export const failConfirmation = createAction('FAIL_CONFIRMATION')
export const requestChangePassword = createAction('REQUEST_CHANGE_PASSWORD')
export const failChangePassword = createAction('FAIL_CHANGE_PASSWORD')
export const validatePassword = createAction('VALIDATE_PASSWORD')
export const chooseWay = createAction('CHOOSE_WAY')
export const changeNumber = createAction('CHANGE_NUMBER')

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
    return (dispatch, getState) => {
        dispatch(requestCode(number))

        return post('/Recovery.aspx/SendCodeForPasswordChange', {
            number,
            type: getState().way
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
        dispatch(validatePassword({pass, repeat}))

        if(pass.trim().length === 0 || pass !== repeat) {
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
    [changeNumber] (state, action) {
        return {
            ...state,
            number: action.payload,
        }
    },

    [requestCode] (state, action) {
        return {
            ...state,
            waiting: true,
            number: action.payload,
            message: ''
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
    number: '',
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

    [validatePassword] (state, action) {
        return {
            ...state,
            passwordEmpty: action.payload.pass.trim().length === 0,
            repeatIncorrectly: action.payload.pass !== action.payload.repeat
        }
    },

    [requestChangePassword] (state) {
        return {
            ...state,
            waiting: true
        }
    },

    [failChangePassword] (state, action) {
        return {
            ...state,
            waiting: false,
            failMessage: action.payload
        }
    }
}, {
    passwordEmpty: false,
    repeatIncorrectly: false,
    failMessage: '',
    waiting: false
})


const way = handleAction(
    chooseWay,
    (state, action) => action.payload || state,
    'phone')

export default combineReducers({ phone, verification, password, way })

