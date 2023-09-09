// Mentor sees the text "Module 1 Technical Interview",  "Learner name: name", and "Date: test day" on browser, written from JS
const text1 = document.getElementById("text-1");
text1.innerText = "Module 1 Technical Interview";

const text2 = document.getElementById("text-2");
text2.innerText = "Learner name: Thanh";

let day = new Date().toString();
const text3 = document.getElementById("text-3");
text3.innerText = "Date:" + day;

// Mentor see jobs data on browser's console
let page =1;
let queryString =""
const baseUrl = "https://frcz3.sse.codesandbox.io";
const url = `${baseUrl}/jobs`;
const getAllJobs = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data
  } catch (error) {
    console.log("err", error.message);
  }
};
// Mentor see a list of 10 job titles on browser
const getListJobs = async () => {
  try {
    const urlList = `${baseUrl}/jobs?_page=${page}&_limit=10&q=${queryString}`
    const response = await fetch(urlList);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("err", error.message);
  }
};

const renderJob = async () => {
  try {
    const data = await getListJobs();
    const liList = document.getElementById("ul-list");
    let listJobs = "";
    data.forEach((job) => {
      listJobs += `<li>${job.title}</li>`;
    });
    liList.innerHTML = listJobs;
  } catch (error) {
    console.log("err", error.message);
  }
}
renderJob();

// Mentor see 2 buttons: prev and next at the end of the list
// Mentor click the buttons to see a new list of 10 replacing the current
const btnNext = document.getElementById("btn-next")
btnNext.onclick = async function () {
  page = page + 1;
  await getListJobs()
  await renderJob()
};

const btnPre = document.getElementById("btn-pre")
btnPre.onclick = async function () {
if (page > 1)
 { 
  page = page - 1;
  await getListJobs()
  await renderJob()
} 
};

// Mentor see search input box and search button
// Mentor see search result replacing current list when using the search tool
const keyWord = document.getElementById("search_input");
const btnSearch = document.getElementById("search_icon");
btnSearch.onclick = async function (e) {
  e.preventDefault();
  queryString = keyWord.value;
  renderJob();
};



