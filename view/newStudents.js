import Schedule from "../model/Shedule.js"

const day = document.getElementById("day_schedule")
const modal = document.querySelector(".modal_schedule")
const btnCancelSchedule = document.querySelector(".cancel_schedule")

export default function newElementStudent(idStudent,nameStudent) {
    const newStudent = document.createElement("tr")
    newStudent.setAttribute("id","e_"+idStudent)


    btnCancelSchedule.addEventListener("click",()=>{
        modal.style.visibility = "hidden"
        modal.style.opacity = "0"
    })

    function tdObject(id){
        let newCol = document.createElement("td")
        newCol.setAttribute("class",id)
        let horaInicio = document.createElement("span")
        horaInicio.setAttribute("id","ih")
        horaInicio.textContent = "Hora Inicio: "
        let salto = document.createElement("br")
        let horaFin = document.createElement("span")
        horaFin.setAttribute("id","fh")
        horaFin.textContent = "Hora Fin: "
        newCol.append(horaInicio,salto,horaFin)
        newCol.addEventListener("click",(e)=>{
            let currentElement = e.target.parentElement
            let parentCurrentElement = currentElement.parentElement
            day.setAttribute("class",parentCurrentElement.id)
            day.textContent = currentElement.className
            modal.style.visibility = "visible"
            modal.style.opacity = "1"
        })
        return newCol
    }

    let tdName = document.createElement("td")
    tdName.textContent = nameStudent
    newStudent.append(tdName)

    let days = ["monday","tuesday","wednesday","thursday","friday","saturday"]

    days.forEach((day)=>{
        let tdDay = tdObject(day)
        newStudent.append(tdDay)
    })
    return newStudent
}

