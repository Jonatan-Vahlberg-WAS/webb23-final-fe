import moment from "moment"

export const formatTime = (date, format = "YYYY-MM-DD HH:mm") => {
    return moment(date).format(format)
}