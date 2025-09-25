import { items } from "../../../data/data.js";
import { getCurrentArtist } from "../../globals.js";
import { formatDate, generateDateLabels } from "../../utils/dates.js";

// Selectors
const myHeader = document.querySelector("header");
const itemsSold = document.querySelector("#itemsSold");
const totalIncome = document.querySelector("#totalIncome");
const auctionWidget = document.querySelector(".auction-item");
const incomeOneWeek = document.querySelector("#oneWeek");
const incomeTwoWeeks = document.querySelector("#twoWeeks");
const incomeOneMonth = document.querySelector("#oneMonth");

export function initArtistHomePage() {
  // variable to store the current artist from the local storage
  const currentArtist = getCurrentArtist();

  // style and fill the header
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
  const artistPanel = document.getElementById("artistPanelHomePage");

  const menuHome = document.querySelector("#artistPanelHomePage .home-menu");
  const menuItems = document.querySelector("#artistPanelHomePage .items-menu");
  const menuAuction = document.querySelector("#artistPanelHomePage .auction-menu");

  // add event listeners
  logo.addEventListener("click", () => {
    location.hash = "#landingPage";
  });

  hamburgerMenu.addEventListener("click", function () {
    if (artistPanel.style.display === "none" || artistPanel.style.display === "") {
      artistPanel.style.display = "block";
    } else {
      artistPanel.style.display = "none";
    }
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

  auctionWidget.addEventListener("click", () => {
    location.hash = "#auctionPage";
  });

  // function for setting button active
  function setActiveButton(button) {
    // remove active class from all buttons
    incomeOneWeek.classList.remove("active-btn");
    incomeTwoWeeks.classList.remove("active-btn");
    incomeOneMonth.classList.remove("active-btn");

    // add active class to the clicked button
    button.classList.add("active-btn");
  }

  incomeOneWeek.addEventListener("click", () => {
    updateChart(7);
    setActiveButton(incomeOneWeek);
  });

  incomeTwoWeeks.addEventListener("click", () => {
    updateChart(14);
    setActiveButton(incomeTwoWeeks);
  });

  incomeOneMonth.addEventListener("click", () => {
    updateChart(30);
    setActiveButton(incomeOneMonth);
  });

  // filter the items by the current artist
  const artistItems = items.filter((item) => item.artist === currentArtist);

  // filter the sold items of the artist
  const soldArtistItems = artistItems.filter((item) => !!item.priceSold);

  // sum the price of the sold items
  const sumOfSoldItems = soldArtistItems.reduce((sum, item) => sum + item.priceSold, 0);

  // store the artist items in variable
  const totalArtistItems = artistItems.length;
  const totalArtistSoldItems = soldArtistItems.length;

  // display them in the html
  itemsSold.innerHTML = `${totalArtistSoldItems}/${totalArtistItems}`;
  totalIncome.innerHTML = `$${sumOfSoldItems}`;

  // Get the latest sale date
  const latestDate = new Date(Math.max(...soldArtistItems.map(item => new Date(item.dateSold))));

  const labels = [];
  const chartData = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(latestDate);
    date.setDate(date.getDate() - i);
    const label = formatDate(date);
    labels.push(label);

    let sum = 0;
    soldArtistItems.forEach((item) => {
      const formattedDateSold = formatDate(new Date(item.dateSold));
      if (formattedDateSold === label) {
        sum += item.priceSold;
      }
    });
    chartData.push(sum);
  }

  const ctx = document.getElementById("myChart");

  const maxValue = Math.max(...chartData);

  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Amount",
          data: chartData,
          backgroundColor: "#a16a5e",
          borderWidth: 1,
        },
      ],
    },
    options: {
      indexAxis: "y",
      scales: {
        x: {
          beginAtZero: true,
          suggestedMax: maxValue * 1.1, // Add 10% padding
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  function updateChart(days) {
    // Get the latest sale date
    const latestDate = new Date(Math.max(...soldArtistItems.map(item => new Date(item.dateSold))));

    const labels = [];
    const chartData = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(latestDate);
      date.setDate(date.getDate() - i);
      const label = formatDate(date);
      labels.push(label);

      let sum = 0;
      soldArtistItems.forEach((item) => {
        const formattedDateSold = formatDate(new Date(item.dateSold));
        if (formattedDateSold === label) {
          sum += item.priceSold;
        }
      });
      chartData.push(sum);
    }

    const maxValue = Math.max(...chartData);

    myChart.data.labels = labels;
    myChart.data.datasets[0].data = chartData;
    myChart.options.scales.x.suggestedMax = maxValue * 1.1;
    myChart.update();
  }

  updateChart(14);
}
