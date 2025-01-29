import { enableInput, inputEnabled, message, setDiv, token } from "./index.js";
import { showStudents } from "./student.js";

let addEditDiv = null;
let studentName = null;
let studentId = null;
let startDate = null;
let addingJob = null;
  
export const handleAddEdit = () => {


   
  addEditDiv = document.getElementById("edit-job");
  studentName = document.getElementById("studentName");
  studentId = document.getElementById("studentId");
  startDate = document.getElementById("startDate");
  addingJob = document.getElementById("adding-job");

  console.log("studentName:",studentName , studentName.value);
  console.log("studentId:", studentId, studentId.value);
  console.log("startDate:", startDate , startDate.value);
 
  console.log("addingJob:", addingJob);


  const editCancel = document.getElementById("edit-cancel");

 

  addEditDiv.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addingJob) {


        enableInput(false);

        let method = "POST";
        let url = "/api/v1/students";
      
        if (addingJob.textContent === "update") {
          method = "PATCH";
          url = `/api/v1/students/${addEditDiv.dataset.id}`;
        }
        else if (addingJob.textContent === "delete"){
            method = "DELETE";
            url = `/api/v1/students/${addEditDiv.dataset.id}`;

        }
      


        try {
          const response = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name: studentName.value,
              studentId: studentId.value,
              startDate: startDate.value,
            }),
          });
      
          const data = await response.json();
          if (response.status === 200 || response.status === 201) {
            if (response.status === 200) {
              // a 200 is expected for a successful update
              message.textContent = "The job entry was updated.";
            } else {
              // a 201 is expected for a successful create
              message.textContent = "The job entry was created.";
            }
      
            studentName.value = "";
            studentId.value = "";
            startDate.value = "";
            showStudents();
          } else {
            message.textContent = data.msg;
          }
        } catch (err) {
          console.log(err);
          message.textContent = "A communication error occurred.";
        }
        enableInput(true);
      
     } else if (e.target === editCancel) {
        message.textContent = "";
        showStudents();
      }
    
    }
  });
};

export const showAddEdit = async (jobId , context) => {
    
    if (!jobId) {
        
        studentName.value = "";
        studentId.value = "";
        startDate.value = "";
      addingJob.textContent = "add" ;
      message.textContent = "";
      setDiv(addEditDiv);
    } 
    else 
    {
        console.log("Edit")
      enableInput(false);
  
      try {
        const response = await fetch(`/api/v1/students/${jobId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await response.json();
        if (response.status === 200) {
          studentName.value = data.job.name;
          studentId.value = data.job.studentId;
          startDate.value = data.job.startDate;
          addingJob.textContent = context;
          if (context==="update")  {
          message.textContent = ""}
          else{
            message.textContent = "Do you want to delete this record?"
          }

          addEditDiv.dataset.id = jobId;
  
          setDiv(addEditDiv);
        } else {
          // might happen if the list has been updated since last display
          message.textContent = "The student entry was not found";
          showStudents();
        }
      } catch (err) {
        console.log(err);
        message.textContent = "A communications error has occurred.";
        showStudents();
      }
  
      enableInput(true);
    }
  };