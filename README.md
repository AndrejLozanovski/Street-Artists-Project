# Street Artists

This is my second project a mobile application for street atrists, it is a single page application built in JavaScript.

The landing page is a place to choose how do you want to enter. There are 2 options "Join as Artist" if you are an artist with choosing your name from the select field. The users are fetched from this Api https://jsonplaceholder.typicode.com/users. Second option is to "Join as Visitor".

# Join as Artist

After selecting your name from the select field you are redirected to your home page (artistHomePage). Here you can see your progress, your total items, how many of them have you sold, your total income and live auctioning which tells you the current bid if your item is on auction (this doesn't work properly right now it's just hardcoded), and also redirects you to auctioning page when you click it. Under that there is graph with history of the income from last 7, 14 and 30 days (this doesn't display the graph lines). At the top is the logo of the page that leads to the landing page, in the middle is your name and a hamburger menu.
In the hamburger menu there are 3 links "Home" that leads to artistHomePage, "Items" that leads to artistItemsPage and "Auction" that leads to auctionPage.

# artistItemsPage

Here you can see all of your items and also add a new item. Under every item there are 4 buttons "Send to Auction" that when clicked will send the item to a live auction, "Publish/Unpublish" this button changes depending in the item is published or not. When you select publish your item will be published and visitors can see it on their page and unpublish is to remove it from showing. "Remove" button it to remove the item and "Edit" is to edit your item.
On clicking the add new item it will open a form to fill it with title, description, type of painting, price and add an image by URL or take a picture with your phone (this right now works for laptop and will open your camera) and at the top there is a checkbox to list it as published or unpublished, this will be checked by default. After adding the item the item will show in the artistItemsPage.

# auctionPage

When the artist choose to send an item to auction by clicking the "Send to auction" button in the items page, you will be redirected to the auction page where timer starts ticking and there are 2 minutes. Under the item there is field with the current price of the item and a bid button. The bidding system is random and not real, if you press the bid button and the last price is your price after the 2 minutes pass the auction ends, if you press bid and there is another price that someone bid higher the time will refresh to 2:00 again and you can choose if u want to bid another price, if you choose to not the auction will end and the item will be sold for the highest last price.

# Join as Visitor

When you join as visitor you are able to see all the items that are published by the artist and potentionally buy one if you are interested. You are redirected to the visitor home page (visitorHomePage). At the top there is Logo and auction logo that leads to the auction page. There is looking for masterpiece section with a "Find one now!" button, under that there is slider that slides the masterpieces from the artists and a carousel at the bottom. When clicking the items in the slider and the "Find one now!" button you will be redirected to a page (visitorListing) where you can list all the masterpieces from all of the artists that are published.

You have an option here to filter them by clicking the filter button in the right left bottom. You can filter them by title name, by artist, by price (minimum and maximum) and by painting type. After clicking the check button you will see only the items that you have asked for.
