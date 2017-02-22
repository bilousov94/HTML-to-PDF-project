# html-to-pdf-project

Live demo: https://bilousov94.github.io/html-to-pdf-project/

This project for creating a single page business card and reading news from Wall street journal. 
Tools, which I used for creating this project:
- Wall Street Journal API
- Bootstrap
- jQuery
- Underscore.js
- pdflayer API
- firebase
- bootsnipp.com

I chosed Google sing-in method for firebase. So, before you can check or convert to pdf your business card your need to 
make Log in using your google account.
For pdflayer API I need 3 parametrs:
1) API key;
2) page parametrs;
3) document url (link to your page, which you want to convert to PDF).

When you click convert-to-PDF button you push all data from inputs to firebase, then you will be redirected to another page (card.html).
This page using data from firebase. This page create document-url based on data from firebase and then create a page content, which read 
from url. After that this page (card.html) making a request and returns your Business card in PDF.

The main feature of pdflayer API is that, that it converts exactly HTML which on your page. So you can't just set { display: none }
property to some element and then convert to PDF all page.
