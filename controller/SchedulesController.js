export default class SchedulesController{
    #listSchedules

    constructor(){
        this.#listSchedules = []
    }

    addSchedule(newSchedule){
        this.#listSchedules.push(newSchedule)
    }

    updateSchedule(current, newSchedule){
        let idx = this.#listSchedules.indexOf(current)
        this.#listSchedules[idx] = newSchedule
    }

    findById(id){
        let codes = this.#listSchedules.filter((schedule)=>schedule.code_student==id)
        return codes.length > 0
    }

    get listSchedules(){
        return this.#listSchedules
    }

    set listSchedules(listLocal){
        this.#listSchedules = listLocal
    }
}