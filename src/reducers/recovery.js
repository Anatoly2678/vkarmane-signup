import { combineReducers } from 'redux'
import { createAction, handleActions, handleAction } from 'redux-actions'
import fetch from 'isomorphic-fetch'
import {normalizePhone} from '../react-helpers'

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
export const abortCodeConfirmation = createAction('ABORT_CODE_CONFIRMATION')
export const decrementSecsToRepeat = createAction('DECREMENT_SECS_TO_REPEAT')

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
        const way = getState().way

        if(way === 'phone') {
            try {
                number = normalizePhone(number)
            }
            catch(ex) {
                dispatch(invalidNumber("Пожалуйста, заполните поле корректно"))
                return
            }
        } else {
            const isValid = /^[\w|\.|-]+@[\w|\.|-]+(\.\w+)+$/.test(number)
            if (!isValid) {
                dispatch(invalidNumber("Пожалуйста, заполните поле корректно"))
                return
            }
        }

        dispatch(requestCode(number))
        dispatch(repeatTimer())


        return post('/Recovery.aspx/SendCodeForPasswordChange', {
            number,
            type: way
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
                location.href = '/signin.html'
            } else {
                dispatch(failChangePassword(result.Message))
            }
        }).catch(ex =>
            console.error(ex))
    }
}

function repeatTimer() {
    return (dispatch, getState) => {

        const secs = getState().phone.secsToRepeat
        let timerId = getState().phone.timerId
        if(timerId)  clearTimeout(timerId)

        if(secs) {
            timerId = setTimeout(function(){
                dispatch(repeatTimer())
            }, 1000)
            dispatch(decrementSecsToRepeat(timerId))
        }
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
            message: '',
            secsToRepeat: 60
        }
    },

    [invalidNumber] (state, action) {
        return {
            ...state,
            message: action.payload,
            waiting: false,
            secsToRepeat: 0
        }
    },

    [receiveCodeId] (state, action) {
        return {
            ...state,
            codeId: action.payload,
            waiting: false
        }
    },

    [chooseWay] (state) {
        return {
            ...state,
            number: '',
            codeId: '',
            message: ''
        }
    },

    [abortCodeConfirmation]  (state)  {
        return {
            ...state,
            codeId: '',
            secsToRepeat: 0
        }
    },

    [decrementSecsToRepeat]  (state, action)  {
        return {
            ...state,
            secsToRepeat: state.secsToRepeat - 1,
            timerId: action.payload
        }
    }
}, {
    number: '',
    sent: false,
    message: '',
    codeId: '',
    waiting: false,
    secsToRepeat: 0,
    timerId: null
})

const verification = handleActions({
    [requestConfirmation]: (state, action) => ({
        ...state,
        waiting: true,
        code: action.payload
    }),
    [abortCodeConfirmation]: (state, action) => ({
        ...state,
        waiting: false,
        message: ''
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

