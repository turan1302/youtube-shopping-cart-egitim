import Swal from "sweetalert2";

class Notification{
    static success = (data)=>{
        return Swal.fire({
            title : "Başarılı",
            text : data,
            icon : "success",
            confirmButtonText : "OK"
        })
    }

    static error = (data)=>{
        return Swal.fire({
            title : "Hata",
            text : data,
            icon : "error",
            confirmButtonText : "OK"
        })
    }
}

export default Notification;
