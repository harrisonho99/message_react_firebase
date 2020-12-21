export default function timeConverter(timestamp) {
    var a = new Date(timestamp);
    var year = a.getFullYear();
    var month = a.getMonth() + 1;
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (min < 10) {
        min = "0" + min;
    }

    var time = hour + ":" + min + " " + date + "/" + month + "/" + year;
    return time.toString();
}
