# TV-Tracker

Demo: https://yankidank.github.io/TV-Tracker/

Track TV is used to find and follow your favorite TV shows. The site lets you explore details for any TV program by compiling information from across the web, making searching for program details easier.

Track TV uses multiple APIs to streamline show details:
* TVMaze: Show data and poster image
* OMDB: IMDB Ratings
* FanArt: Fan artwork and posters
* YouTube: Video result for the provided search term

Users begin by entering a search term to find a show. Search results provide information for each TV show including a description, IMdB rating, and when the next episode airs. A YouTube section in the right column displays the most popular search result for the search term.

IMDB Ratings are colorized based on the review score:
* Red scores are for ratings less than 4
* Yellow scores are for ratings between 4 and 7
* Green scores are for ratings over 7

![Search](https://user-images.githubusercontent.com/58633404/75084886-57be9b80-54d8-11ea-8de5-13250d32c3f1.PNG)

By clicking on the star icon, a specific show is added to the "My Tracked Shows" list. Clicking on a tracked title in the sidebar will bring up information for that specific show. To remove a show, click on the star icon. 

When you track a show, it is added to the site's landing page which displays a schedule for the upcoming week. Any shows airing over the next week will be listed here, grouped by date.

![Schedule](https://user-images.githubusercontent.com/58633404/75084885-568d6e80-54d8-11ea-84b5-62400594a431.PNG)
