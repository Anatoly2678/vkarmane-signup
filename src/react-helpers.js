export function $if(cond, result, alt = '') {
    return cond ? result : alt
}

export function $ifEnter(handler) {
    return e => {if (e.key === 'Enter') handler(e)}
}