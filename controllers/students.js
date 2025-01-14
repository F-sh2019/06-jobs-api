const getAllStudents= async (req , res) => {
    res.send('getAllStudents')
}

const getStudent= async (req , res) => {
    res.send('get a Student')
}
const createStudent= async (req , res) => {
    res.send('Create a student')
}
const updateStudent= async (req , res) => {
    res.send('update a student')
}
const deleteStudent= async (req , res) => {
    res.send('delete  a student ')
}

module.exports = {getAllStudents ,getStudent, createStudent, updateStudent ,deleteStudent ,}