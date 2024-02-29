import { setCurrentArtist } from "../../globals.js";

const myHeader = document.querySelector("header");
const artistsSelect = document.querySelector("#artists");
const joinVisitor = document.querySelector("#joinAsVisitor");

async function getUsers() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await res.json();

    const userList = (users ?? []).map((user) => user.name);

    const chooseOptionHTML = artistsSelect.querySelector("option").outerHTML;

    artistsSelect.innerHTML = chooseOptionHTML;

    userList.forEach((user) => {
      artistsSelect.innerHTML += `<option value="${user}">${user}</option>`;
    });
  } catch (error) {
    console.log(error);
  }
}

export function initLandingPage() {
  console.log("Landing page init");

  myHeader.textContent = "Street ARTists";
  myHeader.setAttribute("style", "text-align: center; padding: 16px;");

  artistsSelect.addEventListener("change", (e) => {
    setCurrentArtist(e.currentTarget.value);

    location.hash = "#artistsHomePage";
  });

  joinVisitor.addEventListener("click", (e) => {
    setCurrentArtist(e.currentTarget.value);

    location.hash = "#visitorHomePage";
  });

  getUsers();
}
