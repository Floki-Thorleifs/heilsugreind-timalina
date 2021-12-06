export const months = {
    "Jan":"jan",
    "Feb":"feb",
    "Mar":"mar",
    "Apr":"apr",
    "May":"maí",
    "Jun":"jún",
    "Jul":"júl",
    "Aug":"ágú",
    "Sep":"sep",
    "Oct":"okt",
    "Nov":"nóv",
    "Dec":"des"
}

export const capitalizeMonth = (string) => {
    let newMonth = months[string];
    return newMonth.charAt(0).toUpperCase() + newMonth.slice(1);
}

export const changeMonthFromDDMMMYYYY = (DDMMMYYYY) =>  {
    const tempDate = DDMMMYYYY.split(" ");
    tempDate[1] = months[tempDate[1]];
    let newStr = "";
    tempDate.forEach((i,k) => {
        if(k !== tempDate.length) newStr += " ";
        if(k === 0) {
            i = Number(i)
            i = i + "."
        };
        newStr+= i;
    });
    return newStr;
}
export const changeMonthFromMMMYYYY = (DDMMMYYYY) =>  {
    const tempDate = DDMMMYYYY.split(" ");
    tempDate[0] = months[tempDate[0]];
    let newStr = "";
    tempDate.forEach((i,k) => {
        if(k !== tempDate.length) newStr += " ";
        if(k === 0) {
            i = i.charAt(0).toUpperCase() + i.slice(1);
        }
        newStr+= i;
    });
    return newStr;
}