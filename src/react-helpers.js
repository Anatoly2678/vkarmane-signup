export function $if(cond, result, alt = '') {
    return cond ? result : alt
}

export function $ifEnter(handler) {
    return e => {if (e.key === 'Enter') handler(e)}
}

export function normalizePhone(number) {
    if(!number) throw new Error('Argument number is false')

    const digits = number.match(/\d/g)
    if(!digits || !digits.length) {
        throw new Error('Invalid number')
    }

    if(digits.length === 10 && digits[0] != '7') {
        digits.unshift('7')
    }

    if(digits.length !== 11) {
        throw new Error('Invalid number')
    }

    const str = digits.join('')
    return `+7(${str.substr(1, 3)}) - ${str.substr(4, 3)} - ${str.substr(7, 2)} - ${str.substr(9, 2)}`
}