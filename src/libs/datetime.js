export const toDate = (str) => {
    return str.replace(' ','T')+'Z';
}

export const toDateOnly = (str) => {
    return str+'T00:00:00Z';
}