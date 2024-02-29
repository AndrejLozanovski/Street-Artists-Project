import { setCurrentArtist } from "../../globals.js";

const myHeader = document.querySelector("header");
const findMasterpieceButton = document.querySelector(".find-masterpiece");
const sliderImage = document.querySelectorAll("#slideImage");

export function initVisitorHomePage() {
  console.log("Visitor Home Page init");

  myHeader.innerHTML = `
  <div>
    <img src="./src/images/logo.png" class="header-logo" alt="logo" />
  </div>
  <p>Street ARTists</p> 
  <img src="./src/images/auctionIcon.svg" class="auction-icon" alt="auctionIcon" />`;

  myHeader.setAttribute(
    "style",
    "display: flex; justify-content: space-between; align-items: center;  padding: 16px "
  );

  const logo = document.querySelector(".header-logo");
  const auctionIcon = document.querySelector(".auction-icon");

  logo.addEventListener("click", (e) => {
    setCurrentArtist(e.currentTarget.value);

    location.hash = "#landingPage";
  });

  auctionIcon.addEventListener("click", (e) => {
    setCurrentArtist(e.currentTarget.value);

    location.hash = "#auctionPage";
  });

  findMasterpieceButton.addEventListener("click", (e) => {
    setCurrentArtist(e.currentTarget.value);

    location.hash = "#visitorListing";
  });

  sliderImage.forEach((image) => {
    image.addEventListener("click", () => {
      location.hash = "#visitorListing";
    });
  });
}
