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

//Yet to test
function getStudentDataAvailable(id) {
  return new Promise(async (resolve) => {
    const response = await axios.get(import.meta.env.VITE_BASE_URL + "/studentData/Available/"+id);
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

// function putStudentData(newStudent) {
//   return new Promise(async (resolve) => {
//     const response = await axios.put(
//       import.meta.env.VITE_BASE_URL + "/studentData",newStudent,{
//         headers: {
//           "Content-Type": "application/json",
//         }
//       });
//     const data = await response.data;
//     resolve({ data });
//   });
// }

function patchStudentData(editStudentData) {
  return new Promise(async (resolve) => {
    const response = await axios.patch(
      import.meta.env.VITE_BASE_URL + "/studentData",editStudentData,{
        headers: {
          "Content-Type": "application/json",
        }
      });
    const data = await response.data;
    resolve({ data });
  });
}

function patchStudentBookInfo(studentBookInfo) {
  return new Promise(async (resolve) => {
    const response = await axios.patch(
      import.meta.env.VITE_BASE_URL + "/studentData/BookInfo",studentBookInfo,{
        headers: {
          "Content-Type": "application/json",
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

function deleteStudentDataBookInfo(bookData) {
  // console.log(oldStudentID);
  return new Promise(async (resolve) => {
    const response = await axios.delete(import.meta.env.VITE_BASE_URL + "/studentData/BookDelete/"+(bookData._id)+"/"+(bookData.book_id));
    const data = await response.data;
    resolve({ data });
  });
}

export default { getStudentData, getStudentDataAvailable,postStudentData, deleteStudentData,patchStudentData,patchStudentBookInfo,deleteStudentDataBookInfo };
