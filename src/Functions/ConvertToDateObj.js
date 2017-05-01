export default function ConvertToDateObj (dateString) {
    // konwertuje datę zapisaną w pliku sluzba.json do obiektu Date w JS
    let dateStructure = dateString.split(" ");
    let dateObj = new Date();
    dateStructure[0] = dateStructure[0].split(".");
    dateStructure[1] = dateStructure[1].split(":");

    dateObj.setDate(dateStructure[0][0]);
    dateObj.setMonth(dateStructure[0][1]);
    dateObj.setFullYear(dateStructure[0][2]);

    dateObj.setHours(dateStructure[1][0]);
    dateObj.setMinutes(dateStructure[1][1]);
    
    return dateObj;
}