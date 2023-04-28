export const toDate = (str) => {
    return str.replace(' ','T')+'Z';
}

export const toDateOnly = (str) => {
    return str+'T00:00:00Z';
}

export const minuteToDateTime = (str) => {
    return str.replace(' ','T')+':00Z';
}

export const getMonth = (month) => {
    let txt;
    switch (month) {
        case "01" || "1" :
            txt = "Januari"
            break
        case "02" || "2" :
            txt = "Februari"
            break
        case "03" || "3" :
            txt = "Maret"
            break
        case "04" || "4" :
            txt = "April"
            break
        case "05" || "5" :
            txt = "Mei"
            break
        case "06" || "6" :
            txt = "Juni"
            break
        case "07" || "7" :
            txt = "Juli"
            break
        case "08" || "8" :
            txt = "Agustus"
            break
        case "09" || "9" :
            txt = "September"
            break
        case "10":
            txt = "Oktober"
            break
        case "11" :
            txt = "November"
            break
        case "12" :
            txt = "Desember"
            break
        default:
            txt = "undifined"
            break
    }
    return txt;
}