const GetFormatedDate = (date) => {

    if (date === undefined) {
        return null
    }

    let splitDate = date.split("/")

    let month = ""
    if (splitDate[1].toString() === "01") {
        month = "JAN"
    } else if (splitDate[1].toString() === "02") {
        month = "FEB"
    } else if (splitDate[1].toString() === "03") {
        month = "MAR"
    } else if (splitDate[1].toString() === "04") {
        month = "APR"
    } else if (splitDate[1].toString() === "05") {
        month = "MAY"
    } else if (splitDate[1].toString() === "06") {
        month = "JUN"
    } else if (splitDate[1].toString() === "07") {
        month = "JUL"
    } else if (splitDate[1].toString() === "08") {
        month = "AUG"
    } else if (splitDate[1].toString() === "09") {
        month = "SEP"
    } else if (splitDate[1].toString() === "10") {
        month = "OCT"
    } else if (splitDate[1].toString() === "11") {
        month = "NOV"
    } else if (splitDate[1].toString() === "12") {
        month = "DEC"
    } else {
        month = ""
    }

    let sprateYear = [...splitDate[2]]

    return `${splitDate[0]}-${month}-${`${sprateYear[2]}${sprateYear[3]}`}`
}

export default GetFormatedDate