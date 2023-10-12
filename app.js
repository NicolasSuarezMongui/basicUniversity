import newElementStudent from "./view/newStudents.js";
import Student from "./model/Student.js";
import StudentController from "./controller/StudentsController.js";
import Course from "./model/Course.js";
import CoursesController from "./controller/CoursesController.js";
import SchedulesController from "./controller/SchedulesController.js";
import Schedule from "./model/Shedule.js";

const tableSchedule = document.querySelector("tbody")
const spanCareer = document.querySelector(".career")

const modalCourse = document.querySelector(".modal_course")
const modalNewStudent = document.querySelector(".modal_new_student")
const modalDelStudent = document.querySelector(".modal_delete_student")

const btnNewStudent = document.querySelector(".save_student")
const btnNewCourse = document.querySelector(".save_course")
const btnSaveSchedule = document.querySelector(".save_schedule")
const btnModalNewStudent = document.querySelector(".addStudent")
const btnModalDelStudent = document.querySelector(".delStudent")
const btnCancelStudent = document.querySelector(".cancel_student")
const btnDeleteStudent = document.querySelector(".delete_student")
const btnDelCancelStudent = document.querySelector(".cancel_delete_student")

const codeStudent = document.getElementById("codeStudent")
const nameStudent = document.getElementById("nameStudent")
const careerStudent = document.getElementById("careerStudent")
const codeCourse = document.getElementById("codeCourse")
const nameCourse = document.getElementById("nameCourse")
const specialtyCourse = document.getElementById("specialtyCourse")
const creditsCourse = document.getElementById("creditsCourse")
const durationCourse = document.getElementById("durationCourse")
const infoName = document.getElementById("infoName")
const infoSpecialty = document.getElementById("infoSpecialty")
const infoDuration = document.getElementById("infoDuration")
const infoCredits = document.getElementById("infoCredits")
const initialHour = document.getElementById("initialHour")
const finalHour = document.getElementById("finalHour")

const controllerStudents = new StudentController()
const controllerCourses = new CoursesController()
const controllerSchedule = new SchedulesController()

window.addEventListener("load",()=>{
    let students = JSON.parse(localStorage.getItem("students"))
    let courses = JSON.parse(localStorage.getItem("courses"))
    let career = localStorage.getItem("career")
    let schedules = JSON.parse(localStorage.getItem("schedules"))

    if(students){
        controllerStudents.listStudents = students
        buildStudents()
    }
    if(courses){
        controllerCourses.listCourses = courses
        buildCourses()
    }else{
        modalCourse.style.visibility = "visible"
        modalCourse.style.opacity = "1"
    }
    if (career){
        spanCareer.textContent=career
        careerStudent.value = career
        careerStudent.disabled = true
        careerStudent.style.color = "white"
    }
    if (schedules){
        controllerSchedule.listSchedules = schedules
        buildSchedules()
    }
})

function buildStudents(){
    controllerStudents.listStudents.forEach((student)=>{
        let tdStudent = newElementStudent(student.code,student.name)
        tableSchedule.append(tdStudent)
    })
}

function buildCourses(){
    let course = controllerCourses.listCourses[0]
    infoName.value = course.name
    infoSpecialty.value = course.specialty
    infoDuration.value = course.duration + ' Horas'
    infoCredits.value = course.credits
}

function buildSchedules(){
    controllerSchedule.listSchedules.forEach((schedule)=>{
        let horaInicio = document.querySelector(`#${schedule.code_student} .${schedule.day} #ih`)
        let horaFin = document.querySelector(`#${schedule.code_student} .${schedule.day} #fh`)
        horaInicio.textContent = schedule.initial_hour
        horaFin.textContent = schedule.final_hour
    })
}

btnNewStudent.addEventListener("click",()=>{
    if (codeStudent.value || nameStudent.value || careerStudent.value != ""){
        if (controllerStudents.findById(codeStudent.value)){
            alert("Codigo ya existente")
        }else{
            let tdStudent = newElementStudent(codeStudent.value,nameStudent.value)
            tableSchedule.append(tdStudent)
            let newStudent = new Student(codeStudent.value,nameStudent.value,"Sistemas")
            controllerStudents.addStudent(newStudent)
            spanCareer.textContent = careerStudent.value
            localStorage.setItem("career",careerStudent.value)
            localStorage.setItem("students",JSON.stringify(controllerStudents.listStudents))
            modalNewStudent.style.visibility = "hidden"
            modalNewStudent.style.opacity = "0"
        }
    }else{
        alert("Hacen falta datos.")
    }
    clear()
})

const delStd = document.getElementById("codeDelStudent")

btnDeleteStudent.addEventListener("click",()=>{
    if (delStd.value!=""){
        if(controllerStudents.findById(delStd.value)){
            controllerStudents.deleteStudent(controllerStudents.objectById(delStd.value))
            localStorage.setItem("students",JSON.stringify(controllerStudents.listStudents))
            modalDelStudent.style.visibility = "hidden"
            modalDelStudent.style.opacity = "0"
            location.reload()
        }else{
            alert("Codigo no existe")
        }
    }else{
        alert("Ingrese un codigo")
    }
})

btnNewCourse.addEventListener("click",()=>{
    if (codeCourse.value || nameCourse.value || specialtyCourse.value || creditsCourse.value || durationCourse.value != ""){
        let newCourse = new Course(codeCourse.value, nameCourse.value, specialtyCourse.value, creditsCourse.value, durationCourse.value)
        controllerCourses.addCourse(newCourse)
        infoName.value = newCourse.name
        infoSpecialty.value = newCourse.specialty
        infoDuration.value = newCourse.duration + ' Horas'
        infoCredits.value = newCourse.credits
        localStorage.setItem("courses",JSON.stringify(controllerCourses.listCourses))
        modalCourse.style.visibility = "hidden"
        modalCourse.style.opacity = "0"
    }else{
        alert("Hacen falta datos")
    }
})

btnModalNewStudent.addEventListener("click",()=>{
    modalNewStudent.style.visibility = "visible"
    modalNewStudent.style.opacity = "1"
})

btnModalDelStudent.addEventListener("click",()=>{
    modalDelStudent.style.visibility = "visible"
    modalDelStudent.style.opacity = "1"
})

btnCancelStudent.addEventListener("click",()=>{
    modalNewStudent.style.visibility = "hidden"
    modalNewStudent.style.opacity = "0"
})

btnDelCancelStudent.addEventListener("click",()=>{
    modalDelStudent.style.visibility = "hidden"
    modalDelStudent.style.opacity = "0"
})

btnSaveSchedule.addEventListener("click",()=>{
    if (finalHour.value>initialHour.value){
        const day = document.getElementById("day_schedule")
        const modal = document.querySelector(".modal_schedule")
        let horaInicio = document.querySelector(`#${day.className} .${day.textContent} #ih`)
        let horaFin = document.querySelector(`#${day.className} .${day.textContent} #fh`)
        horaInicio.textContent = initialHour.value
        horaFin.textContent = finalHour.value
        modal.style.visibility = "hidden"
        modal.style.opacity = "0"
        let newSchedule = new Schedule(controllerCourses.listCourses[0].code,day.className,day.textContent,horaInicio.textContent, horaFin.textContent)
        controllerSchedule.addSchedule(newSchedule)
        localStorage.setItem("schedules",JSON.stringify(controllerSchedule.listSchedules))
    }else{
        alert("Ingrese la hora (Final>Inicial)")
    }
})

function clear(){
    codeStudent.value = ""
    nameStudent.value = ""
    careerStudent.value = ""
}
