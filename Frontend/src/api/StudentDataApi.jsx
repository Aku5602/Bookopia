import axios from "axios";

function getStudentData() {
  return new Promise(async (resolve) => {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + "/studentData",
      {
        "Content-Type": "application/json",
      } 
    );

    const data = await response.data;
    resolve({ data });
  });
}


function postStudentData(newStudent) {
  return new Promise(async (resolve) => {
    const response = await axios.post(
      import.meta.env.VITE_BASE_URL + "/studentData",newStudent,{
        headers: {
          'content-type': 'multipart/form-data',
        }
      });
    const data = await response.data;
    resolve({ data });
  });
}

function deleteStudentData(oldStudentID) {
  console.log(oldStudentID);
  return new Promise(async (resolve) => {
    const response = await axios.delete(import.meta.env.VITE_BASE_URL + "/studentData/"+(+oldStudentID));
    const data = await response.data;
    resolve({ data });
  });
}

export default { getStudentData, postStudentData, deleteStudentData };
