import Course from "../model/Course.js";

export default class CoursesController{
    #listCourses

    constructor(){
        this.#listCourses = []
    }

    addCourse(newCourse){
        this.#listCourses.push(newCourse)
    }

    updateCourse(current,newCourse){
        let idx = this.#listCourses.indexOf(current)
        this.#listCourses[idx] = newCourse
    }

    deleteCourse(course){
        let idx = this.#listCourses.indexOf(course)
        this.#listCourses.splice(idx,1)
    }

    countCourses(){
        return this.#listCourses.length
    }

    get listCourses(){
        return this.#listCourses
    }

    set listCourses(listLocal){
        this.#listCourses = listLocal
    }

}