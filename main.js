import { initArtistHomePage } from "./src/pages/ArtistHomePage/artistHomePage.js";
import { initAuctionPage } from "./src/pages/AuctionPage/auctionPage.js";
import { initArtistCaptureCamera } from "./src/pages/CaptureImage/captureImage.js";
import { initLandingPage } from "./src/pages/LandingPage/landingPage.js";
import { initVisitorListing } from "./src/pages/VisitorListing/visitorListing.js";
import { initVisitorHomePage } from "./src/pages/VisitorHomePage/visitorHomePage.js";
import { initArtistItemsPage } from "./src/pages/ArtistItemsPage/artistItemsPage.js";
import { initArtistsNewItemPage } from "./src/pages/ArtistNewItemPage/artistNewItemPage.js";

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector("#screenSizeModal");

  function checkScreenWidth() {
    const screenWidth = window.innerWidth;
    if (screenWidth > 424) {
      modal.style.display = "block";
    } else {
      modal.style.display = "none";
    }
  }

  // Show modal initially
  checkScreenWidth();

  // Check screen width on resize
  window.addEventListener("resize", function () {
    checkScreenWidth();
  });
});

// router
function handleRouter() {
  const hash = location.hash === "" ? "#landingPage" : location.hash; // #landingPage

  const allPages = document.querySelectorAll(".page");
  allPages.forEach((page) => (page.style.display = "none"));

  document.querySelector(hash).style.display = "block";

  switch (hash) {
    case "#landingPage":
      initLandingPage();
      break;

    case "#visitorHomePage":
      initVisitorHomePage();
      break;

    case "#visitorListing":
      initVisitorListing();
      break;

    case "#artistsHomePage":
      initArtistHomePage();
      break;

    case "#artistsItemsPage":
      initArtistItemsPage();
      break;

    case "#artistsNewItemPage":
      initArtistsNewItemPage();
      break;

    case "#artistsCaptureCamera":
      initArtistCaptureCamera();
      break;

    case "#auctionPage":
      initAuctionPage();
      break;

    default:
      break;
  }
}

window.addEventListener("hashchange", handleRouter);
window.addEventListener("load", handleRouter);
