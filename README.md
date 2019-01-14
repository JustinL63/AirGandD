# NextUp
NextUp is a web application that provides lists of top albums, movies and books and allows you to keep track of all you want to listen to, watch and read. 

https://nextup2018.herokuapp.com

Guest email login: guest@gmail.com

Guest password: password

## User Features
  * NextUp provides lists of 3,000 albums, 1,200 movies and 500 books that critics have recognized for their excellence.
  * The user can interact with the lists in a few ways:
    * NextUp - mark the item for future listening, watching or reading
    * Finished - mark the item as already finished
    * Remove - remove the item from the user's list for good
  * The user has several views available:
    * Remaining - shows the next 50 items that the user has not interacted with yet
    * NextUp - shows all items marked for NextUp, including any user-added content.
    * Finished - shows all items already finished, including any user-added content. Also shows the user how many items they've finished from the list and user-added content.
    * Search/Full Database - shows the entire list, regardless of user interaction. A search bar allows the user to search the entire list.
    * My Added - shows any user-added items that have not been interacted with yet
  * Each view contains a sidebar that shows the next five items marked as NextUp in each category.    
  * The user can add an item if it's not in the provided lists and mark it as NextUp or Finished. 
  * A dashboard view shows the next five NextUp items in each category on the same page. The user is directed to the dashboard upon login.
  * An Amazon button for each item links the user to an Amazon.com page for that item.

## Technical Features
  * A full-stack web application that utilizes Node.js, Express, MySQL, Sequelize and Handlebars
  * Passport is used for user account creation and login
  * The NextUp sidebar first queries the user's items marked as NextUp from the provided list. If there are fewer than five items, a second query goes to the user's added items to see if there are any items there marked for NextUp. A maximum of five items will be displayed.
  * In NextUp and Finished views, items will be displayed first from the provided list, and any items added by the user that meet the criteria will be listed alphabetically from the bottom. 
  * The ability for a user to create a new record in the database, including user-added information for music, movies or books
  * HTML is updated dynamically via Handlebars
  * Fully mobile-responsive
### Database setup
  * The database contains 10 tables: 
    * User: Stores basic user account info (table count: 1)
    * Albums: Stores info for each album and assigns an album ID. This table can't be updated by the user. Movies and books tables as well (table count: 2,3,4).
    * Useralbum: When the user clicks the button to add an album to the NextUp queue, the Useralbum table is searched to see if the user's ID and album ID already exist in the same record, meaning the user has previously interacted with this album. If not, a new entry is created in the table, storing the user's ID, the album's ID, and the nextup value as true. If a previous entry is found, then the nextup value is updated to true and the other possible values (finished and removed) are updated to false. This process works the same if a user selects Finished or Removed, and there are separate tables called Usermovies and Userbooks. Useralbum stores all interactions for all users — a new table is not created for each user (table count: 5, 6, 7).
    * Addedalbums: When the user adds an album, a record containing the user's ID, an itemID for the new item and any info the user added about the album is created. The user also has the option to immediately mark the album as NextUp or Finished, which will be stored in the newly created record as well. All user-added content is stored in this one table. Tables as well for music and books (table count: 8, 9, 10).
  
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



