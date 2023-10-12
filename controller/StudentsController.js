import Student from "../model/Student.js"

export default class StudentController{

    #listStudents

    constructor(){
        this.#listStudents = []
    }

    addStudent(newStudent){
        this.#listStudents.push(newStudent)
    }

    updateStudent(student,newStudent){
        let idx = this.#listStudents.indexOf(student)
        this.#listStudents[idx]=newStudent
    }

    deleteStudent(student){
        let idx = this.#listStudents.indexOf(student)
        this.#listStudents.splice(idx, 1)
    }

    countStudents(){
        return this.#listStudents.length
    }

    findById(id){
        let codes = this.#listStudents.filter((student)=>student.code==id)
        return codes.length > 0
    }

    objectById(id){
        let current = this.#listStudents.filter((student)=>student.code==id)
        return current[0]
    }

    exists(student){
        return this.#listStudents.includes(student)
    }

    get listStudents(){
        return this.#listStudents
    }

    set listStudents(listLocal){
        this.#listStudents = listLocal
    }


}