class UtilService {
    static getDateTime(blnWithTime) {
        const dt = new Date();

        const yy = dt.getFullYear(), mm = dt.getMonth()+1, dd = dt.getDate();
        const hh = dt.getHours(), mn = dt.getMinutes(), ss = dt.getSeconds(); 
        
        const sdt= yy + "-" + (mm < 10 ? "0" : "") + mm + "-" + (dd < 10 ? "0" : "") + dd 
        const stm= (hh < 10 ? "0" : "") + hh + ":" + (mn < 10 ? "0" : "") + mn + ":" + (ss < 10 ? "0" : "") + ss 

        return (sdt + (blnWithTime ? " " + stm : ""));
    }

    static toResult(res, output, strMessage) {
        const resCode = ((!output || output == null) ? 400 : 201);
        const resStat = (resCode == 400 ? "error" : "success");
        const resInfo = (!strMessage ? "" : strMessage);
        const resData = (output || []);
        const resRows = (Array.isArray(resData) ? resData.length : 0);

        res.status(resCode).json({"status": resStat, "message": resInfo, "rows": resRows, "data": resData});
    }
}

module.exports = UtilService;