const getAllJobs= async (req , res) => {
    res.send('getAllJobs')
}

const getJob= async (req , res) => {
    res.send('get a job')
}
const createJob= async (req , res) => {
    res.send('Create Job')
}
const updateJob= async (req , res) => {
    res.send('update Job')
}
const deleteJob= async (req , res) => {
    res.send('delete job ')
}

module.exports = {getAllJobs ,getJob, createJob, updateJob ,deleteJob ,}