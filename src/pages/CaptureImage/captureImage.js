import { getCurrentArtist } from "../../globals.js";

export const initArtistCaptureCamera = () => {
  const liveStreamVideo = document.querySelector("#liveStream");
  const captureStreamCanvas = document.querySelector("#captureCanvas");
  const capturedImageImg = document.querySelector("#capturedImage");

  const captureImageBtn = document.querySelector("#captureImageBtn");

  const myHeader = document.querySelector("header");

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
  const artistPanel = document.getElementById("artistPanelCaptureCamera");

  const menuHome = document.querySelector("#artistPanelCaptureCamera .home-menu");
  const menuItems = document.querySelector("#artistPanelCaptureCamera .items-menu");
  const menuAuction = document.querySelector("#artistPanelCaptureCamera .auction-menu");

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

  // navigor MDN
  navigator.mediaDevices
    .getUserMedia({
      video: {
        facingMode: {
          ideal: "environment",
        },
      },
    })
    .then((stream) => {
      liveStreamVideo.srcObject = stream;
    })
    .catch((err) => {
      console.log(err);
    });

  liveStreamVideo.addEventListener("canplay", function () {
    captureStreamCanvas.width = liveStreamVideo.videoWidth;
    captureStreamCanvas.height = liveStreamVideo.videoHeight;
  });

  captureImageBtn.addEventListener("click", function () {
    const ctx = captureStreamCanvas.getContext("2d");
    ctx.drawImage(liveStreamVideo, 0, 0);

    const imgUrl = captureStreamCanvas.toDataURL("image/png");
    console.log(imgUrl);
    capturedImageImg.src = imgUrl;

    capturedImageImg.src = "";

    let pictureData = imgUrl;
    localStorage.setItem("takenPicture", pictureData);
    location.hash = "#artistsNewItemPage";
  });
};
