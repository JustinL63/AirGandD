# NextUp
NextUp is a web application that provides lists of top albums, movies and books and allows you to keep track of all you want to listen to, watch and read. 

https://nextup2018.herokuapp.com

## User Features
  * NextUp provides lists of 3,000 albums, 1,200 movies and 500 books that critics have recognized for their excellence.
  * The user can interact with the lists in a few ways:
    * NextUp - mark the item for future listening, watching or reading
    * Finished - mark the item as already finished
    * Remove - remove the item from the user's list for good
  * The user has several views available:
    * Remaining - shows the next 50 items that the user has not interacted with yet
    * NextUp - shows all items marked for NextUp
    * Finished - shows all items already finished. Also shows the user how many items they've finished from the list, as well as any user-added content.
    * Search/Full Database - shows the entire list, regardless of user interaction. A search bar allows the user to search the entire list.
    * My Added - shows any user-added items that have not been interacted with yet
  * Each view contains a sidebar that shows the next five items marked as NextUp in each category.    
  * The user can add an item if it's not in the provided lists and mark it as NextUp or Finished. User-added items appear at the bottom of the list alphabetically. 
  * A dashboard view shows the next five NextUp items in each category on the same page.
  * An Amazon button for each item links the user to an Amazon.com page for that item.

## Additional Technical Features
  * Full-stack web application that utilizes Node.js, Express, MySQL, Sequelize and Handlebars
  * Passport used for user account creation and login
  * Database updated through users' use of interactive buttons, either creating a new record or updating a record if the user has already interacted with the item.
  * Ability for user to create a new record in database, including user-added information
  * HTML update dynamically via Handlebars
  * Fully mobile-responsive
***
## Screenshots
### Dashboard View
![Dashboard photo](https://github.com/JustinL63/NextUp/blob/master/public/images/dashboard.PNG "Dashboard")


### Albums Remaining View
![Albums photo](https://github.com/JustinL63/NextUp/blob/master/public/images/albums.PNG "Albums Remaining")


### Add Movie
![Add Movie photo](https://github.com/JustinL63/NextUp/blob/master/public/images/add.PNG "Add Movie")


### Mobile Dashboard
![Mobile Dashboard photo](https://github.com/JustinL63/NextUp/blob/master/public/images/mobile-dashboard.PNG "Mobile Dashboard")


### Mobile Books
![Mobile Books photo](https://github.com/JustinL63/NextUp/blob/master/public/images/mobile-books.PNG "Mobile Books")



