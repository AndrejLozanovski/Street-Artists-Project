import { items } from "../../../data/data.js";
import { getCurrentArtist } from "../../globals.js";
import { itemTypes } from "../../../data/data.js";

const itemType = document.querySelector("#itemType");

// get the item types and fill the options
function getItemTypes() {
  itemTypes.forEach((type) => {
    itemType.innerHTML += `<option value="${type}">${type}</option>`;
  });
}

function handleAddButtonClick() {
  // get the values from the fields
  const image = document.querySelector("#itemImage").value;
  const title = document.querySelector("#itemTitle").value;
  const description = document.querySelector("#itemDescription").value;
  const type = itemType.value;
  const isPublished = document.querySelector("#itemIsPublished").checked;
  const price = document.querySelector("#itemPrice").value;
  const imageData = localStorage.getItem("takenPicture");

  // validation
  if ((!image && !imageData) || !title || !description || !type || !price) {
    alert("Please fill out all required fields.");
    return;
  }

  const artist = getCurrentArtist();
  const dateCreated = new Date().toISOString();

  // new item object
  const newItem = {
    image: image || imageData,
    title,
    description,
    type,
    isPublished,
    price,
    artist,
    dateCreated,
    dateSold: null,
    priceSold: null,
    isAuctioning: false,
  };

  // add the new item to the items
  items.push(newItem);

  const form = document.querySelector("#formNewItem");
  form.reset();

  const capturedImage = document.querySelector("#capturedImage");
  if (capturedImage) {
    capturedImage.remove();
  }

  localStorage.removeItem("takenPicture");

  location.hash = "#artistsItemsPage";
}

export function initArtistsNewItemPage() {
  console.log("Visitor listing init");

  const myHeader = document.querySelector("header");

  const snapShot = document.querySelector(".take-snapshot");
  const addBtn = document.querySelector(".add-item-button");
  const cancelBtn = document.querySelector(".cancel-button");

  const imageData = localStorage.getItem("takenPicture");

  console.log("Image data:", imageData);
  console.log("Snapshot element:", snapShot);

  // if there is image set it into the take-snapshot div
  if (imageData) {
    const img = document.createElement("img");
    img.src = imageData;
    img.id = "capturedImage";
    img.style.position = "absolute";
    img.style.top = "0";
    img.style.left = "0";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";

    snapShot.appendChild(img);

    snapShot.style.position = "relative";
  }

  const currentArtist = getCurrentArtist();
  console.log("initArtistHomePage", currentArtist);

  myHeader.innerHTML = `
      <div>
        <img src="./src/images/logo.png" class="header-logo" alt="logo" />
      </div>
      <p>${currentArtist}</p> 
      <img src="./src/images/hamburgerMenu.svg" class="menu" alt="auctionIcon" />`;

  myHeader.setAttribute(
    "style",
    "display: flex; justify-content: space-between; align-items: center;  padding: 16px "
  );

  const logo = document.querySelector(".header-logo");
  const hamburgerMenu = document.querySelector(".menu");
  const artistPanel = document.getElementById("artistPanelNewItemPage");

  const menuHome = document.querySelector("#artistPanelNewItemPage .home-menu");
  const menuItems = document.querySelector("#artistPanelNewItemPage .items-menu");
  const menuAuction = document.querySelector("#artistPanelNewItemPage .auction-menu");

  logo.addEventListener("click", () => {
    location.hash = "#landingPage";
  });

  hamburgerMenu.addEventListener("click", function () {
    artistPanel.style.display = artistPanel.style.display === "none" ? "block" : "none";
  });

  menuHome.addEventListener("click", () => {
    location.hash = "#artistsHomePage";
    artistPanel.style.display = "none";
  });

  menuItems.addEventListener("click", () => {
    location.hash = "#artistsItemsPage";
    artistPanel.style.display = "none";
  });

  menuAuction.addEventListener("click", () => {
    location.hash = "#auctionPage";
    artistPanel.style.display = "none";
  });

  snapShot.addEventListener("click", () => {
    location.hash = "#artistsCaptureCamera";
  });

  addBtn.removeEventListener("click", handleAddButtonClick);
  addBtn.addEventListener("click", handleAddButtonClick);

  cancelBtn.addEventListener("click", () => {
    location.hash = "#artistsItemsPage";

    const form = document.querySelector("#formNewItem");
    form.reset();
  });
}
getItemTypes();
