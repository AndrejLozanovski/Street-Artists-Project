import { items } from "../../../data/data.js";
import { setCurrentArtist } from "../../globals.js";
import { itemTypes } from "../../../data/data.js";

// selectors
const container = document.querySelector("#vistorListingCardContainer");
const myHeader = document.querySelector("header");
const filter = document.querySelector(".filter");
const filterArtists = document.querySelector("#artist");
const filterType = document.querySelector("#type");
const saveFilter = document.querySelector(".saveFilter");
const close = document.querySelector(".close");

// get the artists and the item types and fill the options of the select tag
async function getArtist() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await res.json();

    const userList = (users ?? []).map((user) => user.name);

    const chooseOptionHTML = filterArtists.querySelector("option").outerHTML;

    filterArtists.innerHTML = chooseOptionHTML;

    filterArtists.innerHTML += `<option value="all">All Artists</option>`;

    userList.forEach((user) => {
      filterArtists.innerHTML += `<option value="${user}">${user}</option>`;
    });

    itemTypes.forEach((type) => {
      filterType.innerHTML += `<option value="${type}">${type}</option>`;
    });
  } catch (error) {
    console.log(error);
  }
}

export function initVisitorListing() {
  const publishedItems = items.filter((item) => item.isPublished);

  // clear the container and add the items
  container.innerHTML = "";
  items.filter((item) => item.isPublished).forEach(renderCard);

  myHeader.innerHTML = `
  <div>
    <img src="./src/images/logo.png" class="header-logo" alt="logo" />
  </div>
  <p>Street ARTists</p> 
  <img src="./src/images/auctionIcon.svg" class="auction-icon" alt="auctionIcon" />`;

  myHeader.setAttribute(
    "style",
    "display: flex; justify-content: space-between; align-items: center;  padding: 16px;  "
  );

  const logo = document.querySelector(".header-logo");
  const auctionIcon = document.querySelector(".auction-icon");

  logo.addEventListener("click", (e) => {
    setCurrentArtist(e.currentTarget.value);

    location.hash = "#landingPage";
  });

  auctionIcon.addEventListener("click", () => {
    location.hash = "#auctionPage";
  });

  filter.addEventListener("click", () => {
    const filterPanel = document.getElementById("filterPanel");

    filterPanel.style.right =
      filterPanel.style.right === "0px" || filterPanel.style.right === "" ? "-100%" : "0px";
  });

  saveFilter.addEventListener("click", () => {
    const filterPanel = document.getElementById("filterPanel");

    const title = document.querySelector("#title").value;
    const artist = document.querySelector("#artist").value;
    const minPriceInput = document.querySelector("#minPrice").value;
    const minPrice = minPriceInput !== "" ? Number(minPriceInput) : 0;
    const maxPriceInput = document.querySelector("#maxPrice").value;
    const maxPrice = maxPriceInput !== "" ? Number(maxPriceInput) : Infinity;
    const type = document.querySelector("#type").value;

    const filtered = publishedItems.filter((item) => {
      return (
        (title ? item.title.toLowerCase().includes(title.toLowerCase()) : true) &&
        (artist && artist !== "all"
          ? item.artist.toLowerCase().includes(artist.toLowerCase())
          : true) &&
        (minPrice !== null && minPrice !== undefined ? item.price >= minPrice : true) &&
        (maxPrice !== null && maxPrice !== undefined ? item.price <= maxPrice : true) &&
        (type && type !== "Choose" ? item.type.toLowerCase().includes(type.toLowerCase()) : true)
      );
    });

    // reset the input fields
    document.querySelector("#title").value = "";
    document.querySelector("#artist").value = "all";
    document.querySelector("#minPrice").value = "";
    document.querySelector("#maxPrice").value = "";
    document.querySelector("#type").value = "Choose";

    // clear the container and add the filtered items
    container.innerHTML = "";
    filtered.forEach(renderCard);

    filterPanel.style.right = "-100%";
  });

  close.addEventListener("click", () => {
    const filterPanel = document.getElementById("filterPanel");

    filterPanel.style.right = filterPanel.style.right === "-100%" ? "0px" : "-100%";
  });

  getArtist();
}

// function for rendering the card
function renderCard(item, idx) {
  const isDark = idx % 2 ? "dark" : "light";
  const isLight = idx % 2 ? "light" : "dark";

  container.innerHTML += `<div class="card card-bg-${isDark} mb-4">
                                <img src="${item.image}" class="card-img-top" alt="${item.title}">
                                <div class="card-body">
                                <div class=" justify-content-between">
                                <h5 class="card-artist color-${isLight}">${item.artist}</h5>
                                <span class="price-${isLight}">$${item.price}</span>
                                </div>
                                <p class="card-title color-${isLight}">${item.title}</p>
                                <p class="card-text color-${isLight}">${item.description}</p>
                                
                                </div>
                            </div>`;
}
