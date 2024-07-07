import { items } from "../../../data/data.js";

export const initAuctionPage = () => {
  let timeRemaining = localStorage.getItem("timeRemaining")
    ? parseInt(localStorage.getItem("timeRemaining"))
    : 120;
  let timer;
  let lastBidAmount = 0;
  let bidInput;

  // Function to reset the timer
  function resetTimer() {
    timeRemaining = 120;
    localStorage.setItem("timeRemaining", timeRemaining);
  }

  // Function to update the timer display
  function updateTimer() {
    if (timeRemaining <= 0) {
      clearInterval(timer);
      timerElement.textContent = "Auction ended";

      // Update the item
      const currentItem = items.find((item) => item.id === window.currentAuctionItem.id);
      if (currentItem) {
        currentItem.priceSold = lastBidAmount;
        currentItem.dateSold = new Date();
        currentItem.isAuctioning = false;
      }
      resetTimer();

      bidInput.value = "";
      biddingHistory.innerHTML = "";

      return;
    }

    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerElement.textContent = `Time remaining: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    localStorage.setItem("timeRemaining", timeRemaining);
  }

  function startTimer() {
    if (timer) {
      clearInterval(timer);
    }
    timer = setInterval(() => {
      timeRemaining--;
      updateTimer();
    }, 1000);
  }

  function loadAuctionPage() {
    const item = window.currentAuctionItem;
    if (!item) return;

    bidInput = document.querySelector("#biddingInput");
    const auctionContainer = document.querySelector("#itemOnAuction");
    auctionContainer.innerHTML = `
      <div class="card bgc-dark border-0 t-light mb-4">
        <img src="${item.image}" class="card-img-top" alt="${item.title}">
        <div class="card-body">
          <div class=" justify-content-between">
            <h5 class="card-artist" style="font-size:30px">${item.artist}</h5>
          </div>
          <p class="card-title m-0 mb-3" style="font-family: Roboto; font-size:14px">${item.title}</p>
          <p class="card-text m-0" style="font-family: Roboto; font-size:14px">${item.description}</p>
        </div>
      </div>
      <p class="m-0 px-3" style="font-family: Roboto">Starting price: $${item.price}</p>
    `;

    bidInput.value = item.price;
    startTimer();
  }

  window.addEventListener("hashchange", () => {
    if (location.hash === "#auctionPage") {
      loadAuctionPage();
    }
  });

  if (location.hash === "#auctionPage") {
    loadAuctionPage();
  }

  // Stop the timer when the page is closed
  window.addEventListener("beforeunload", function () {
    clearInterval(timer);
  });

  const myHeader = document.querySelector("header");
  myHeader.innerHTML = `
    <div>
      <img src="./src/images/logo.png" class="header-logo" alt="logo" />
    </div>
    <p>Street ARTists</p> 
    <img src="./src/images/auctionIcon.svg" class="auction-icon" alt="auctionIcon" />
  `;
  myHeader.setAttribute(
    "style",
    "display: flex; justify-content: space-between; align-items: center; padding: 16px; position: static;"
  );

  const logo = document.querySelector(".header-logo");
  const auctionIcon = document.querySelector(".auction-icon");

  logo.addEventListener("click", () => {
    location.hash = "#landingPage";
  });

  auctionIcon.addEventListener("click", () => {
    location.hash = "#auctionPage";
  });

  const bidBtn = document.querySelector("#bidBtn");
  const biddingHistory = document.querySelector("#biddingHistory");
  const timerElement = document.querySelector("#timer");

  bidBtn.addEventListener("click", function () {
    const myBidFormData = new FormData();
    myBidFormData.set("amount", bidInput.value);

    biddingHistory.innerHTML += `<li class="mine">You: $${bidInput.value}</li>`;

    fetch("https://projects.brainster.tech/bidding/api", {
      method: "POST",
      body: myBidFormData,
    })
      .then((res) => res.json())
      .then((data) => {
        const isBidding = data.isBidding;

        if (isBidding) {
          biddingHistory.innerHTML += `<li class="bidder" style="margin-left: 200px">Bidder: $${data.bidAmount}</li>`;
          bidInput.value = data.bidAmount + 50;
          timeRemaining = 120;
          lastBidAmount = data.bidAmount;
          resetTimer();
        }
      });

    window.addEventListener("hashchange", function () {
      if (location.hash !== "#auctionPage") {
        resetTimer();
      }
    });
  });
};
