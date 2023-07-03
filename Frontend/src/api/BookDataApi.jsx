import axios from "axios";

function getBookData() {
  return new Promise(async (resolve) => {
    const response = await axios.get(import.meta.env.VITE_BASE_URL + "/bookData");
    const data = await response.data;
    // console.log(data);
    resolve({ data });
  }); 
}

function getBookDataAvailable(id) {
  return new Promise(async (resolve) => {
    const response = await axios.get(import.meta.env.VITE_BASE_URL + "/bookData/Available/"+id);
    const data = await response.data;
    resolve({ data });
  });
}

 
function postBookData(newBook) {
  return new Promise(async (resolve) => {
    const response = await axios.post(
      import.meta.env.VITE_BASE_URL + "/bookData",newBook,{
        headers: {
          'content-type': 'multipart/form-data',
        }
      });
    const data = await response.data;
    resolve({ data });
  });
}
//Update
function patchBookData(editBookData) {
  return new Promise(async (resolve) => {
    const response = await axios.patch(
      import.meta.env.VITE_BASE_URL + "/bookData",editBookData,{
        headers: {
          "Content-Type": "application/json",
        }
      });
    const data = await response.data;
    resolve({ data });
  });
}

//Delete

function deleteBookData(oldBookID) {
  console.log(oldBookID);
  return new Promise(async (resolve) => {
    const response = await axios.delete(
      import.meta.env.VITE_BASE_URL + "/bookData/"+(+oldBookID)
  );
    const data = await response.data;
    resolve({ data });
  });
}

export default { getBookData,postBookData,deleteBookData,getBookDataAvailable,patchBookData };
