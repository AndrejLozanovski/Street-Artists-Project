import { items } from "../../../data/data.js";
import { getCurrentArtist } from "../../globals.js";

const artistItemContainer = document.querySelector("#artistsItemsContainer");

let currentItem = null;

// function to reset form fields
function resetFormFields() {
  document.querySelector("#itemTitle").value = "";
  document.querySelector("#itemImage").value = "";
  document.querySelector("#itemPrice").value = "";
  document.querySelector("#itemDescription").value = "";
  document.querySelector("#itemIsPublished").checked = false;
  document.querySelector("#itemType").value = "";
}

export function initArtistItemsPage() {
  const currentArtist = getCurrentArtist();

  // selectors
  const addNewItem = document.querySelector("#addNewItem");
  const addBtn = document.querySelector(".add-item-button");
  const updateBtn = document.querySelector(".update-item-button");
  const myHeader = document.querySelector("header");

  // clear the artist item container and add the filtered items
  artistItemContainer.innerHTML = "";
  items.filter((item) => item.artist === currentArtist).forEach(renderCard);

  myHeader.innerHTML = `
      <div>
        <img src="./src/images/logo.png" class="header-logo" alt="logo" />
      </div>
      <p>${currentArtist}</p> 
      <img src="./src/images/hamburgerMenu.svg" class="menu" alt="auctionIcon" />`;

  myHeader.setAttribute(
    "style",
    "display: flex; justify-content: space-between; align-items: center;  padding: 16px; position: static; "
  );

  const logo = document.querySelector(".header-logo");
  const hamburgerMenu = document.querySelector(".menu");
  const artistPanel = document.getElementById("artistPanelItemsPage");

  const menuHome = document.querySelector("#artistPanelItemsPage .home-menu");
  const menuItems = document.querySelector("#artistPanelItemsPage .items-menu");
  const menuAuction = document.querySelector("#artistPanelItemsPage .auction-menu");

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

  addNewItem.addEventListener("click", () => {
    location.hash = "#artistsNewItemPage";
    updateBtn.style.display = "none";
    addBtn.style.display = "flex";
  });
}

// function to generate item cards
function renderCard(item) {
  const card = document.createElement("div");
  card.innerHTML = `<div class="card bgc-lighter mb-4 border-0">
                                <img src="${item.image}" class="card-img-top" alt="${item.title}">
                                <div class="card-body">
                                <div class="d-flex justify-content-between">
                                <h5 class="card-title m-0 t-dark">${item.title}</h5>
                                <span class="bgc-dark card-price">$${item.price}</span>
                                </div>
                                <small class="card-date">${item.dateCreated}</small>
                                
                                <p class="card-text m-0 pt-3">${item.description}</p>
                                
                                </div>
                                <div class="card-footer bgc-dark d-flex justify-content-between">
                                <button class="send-to-auction">Send to Auction</button>
                                <button class="publish-unpublish ${
                                  item.isPublished ? "unpublish" : "publish"
                                }">${item.isPublished ? "Unpublish" : "Publish"}</button>
                                <button class="remove-item">Remove</button>
                                <button class="edit-item">Edit</button>
                              </div>
                            </div>`;

  const sendToAuctionButton = card.querySelector(".send-to-auction");

  sendToAuctionButton.addEventListener("click", () => {
    window.currentAuctionItem = item;
    location.hash = "#auctionPage";
  });

  const publishUnpublishButton = card.querySelector(".publish-unpublish");

  publishUnpublishButton.addEventListener("click", () => {
    item.isPublished = !item.isPublished;

    publishUnpublishButton.textContent = item.isPublished ? "Unpublish" : "Publish";
    publishUnpublishButton.classList.toggle("publish");
    publishUnpublishButton.classList.toggle("unpublish");
  });

  artistItemContainer.appendChild(card);

  const removeItemButton = card.querySelector(".remove-item");

  removeItemButton.addEventListener("click", () => {
    const confirmation = confirm("Are you sure you want to remove this item?");
    if (confirmation) {
      // remove the card from the html
      card.remove();

      // remove the item from the items
      const index = items.indexOf(item);
      if (index > -1) {
        items.splice(index, 1);
      }
    }
  });

  const updateItem = document.querySelector(".update-item-button");

  const editItemButton = card.querySelector(".edit-item");

  editItemButton.addEventListener("click", () => {
    location.hash = "#artistsNewItemPage";

    const addNewItemButton = document.querySelector(".add-item-button");

    addNewItemButton.style.display = "none";
    updateItem.style.display = "flex";

    currentItem = item;

    // fill the form fields with the data from the item that we edit
    document.querySelector("#itemTitle").value = item.title;
    document.querySelector("#itemImage").value = item.image;
    document.querySelector("#itemPrice").value = item.price;
    document.querySelector("#itemDescription").value = item.description;
    document.querySelector("#itemIsPublished").checked = item.isPublished;
    const itemTypeSelect = document.querySelector("#itemType");
    itemTypeSelect.value = item.type;

    updateItem.addEventListener("click", () => {
      location.hash = "#artistsItemsPage";
      // update the item with the changes
      currentItem.title = document.querySelector("#itemTitle").value;
      currentItem.image = document.querySelector("#itemImage").value;
      currentItem.price = document.querySelector("#itemPrice").value;
      currentItem.description = document.querySelector("#itemDescription").value;
      currentItem.isPublished = document.querySelector("#itemIsPublished").checked;

      // update the item in the array
      const index = items.findIndex((item) => item.id === currentItem.id);
      if (index !== -1) {
        items[index] = currentItem;
      }

      // update the card in the html
      card.querySelector(".card-title").textContent = currentItem.title;
      card.querySelector(".card-img-top").src = currentItem.image;
      card.querySelector(".card-price").textContent = `$${currentItem.price}`;
      card.querySelector(".card-text").textContent = currentItem.description;
      card.querySelector(".publish-unpublish").textContent = currentItem.isPublished
        ? "Unpublish"
        : "Publish";

      // reset the current item
      currentItem = null;

      // reset the form fields
      resetFormFields();
    });
  });
}
