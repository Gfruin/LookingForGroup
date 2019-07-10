# LookingForGroup

------------
USER STORIES:
------------
1. User will be able to create account
2. User will be able to define account as either “GameMaster” (GM) or “Player” (PC)
3. User will be able to categorize themselves with these markers:
    - Looking for group
    - Looking for GM 
    - Looking for PC’s
    - Game Environment(Online, In-person, Mixed)
    - Will be able to set their zip code
4. User will be able to define these categories:
    - Party size
    - Is available? switch on and off
    - Skillset
    - Preferred gamestyle(roleplay heavy, rules oriented, combat heavy, dungeon crawl)
    - Gamemaster materials (miniatures, maps, dice, books, etc)
    - Description
    - Experience
5. User will be able to search the database of users based on these categories to find groups
6. User will be be able to see users with similar categories
7. User-GM will be able to create game pages based on current games and invite PC-users to the page

------------
NICE-TO-HAVES:
------------

1. User will be able to upload images to their posts, group pages, and profiles
2. Ratings for PC’s and GM’s and comments 
3. Users will be able to Direct Message(DM) other users to communicate

------------
STRETCH GOALS:
------------
1. Consume the D&D 5e and let Users create basic characters based on the data
2. Users will be able to search information about spells, items, monsters based on search term
3. User-GM will be able to create monster stat-blocks
4. Users will be able to create posts to discuss D&D
5. Users will be able to have conversations with multiple participants
6. Users will be able to send out push notifications based on current conversations
7. Users will be able to see location markers of other users nearby through Google maps API

------------
APP FEATURES
------------

CURRENT FEATURES ----

1. This app will use user provided location data. This data will then use the Google Maps API and render the locations on the user match-making page

2. Model One-User <----
- GM? boolean
- Available?
- Location
- Game System
- Game Style
- Game Materials
- Experience 
- Description
- First Name
- Last Name
- Username
- Email


3. Model Two-Group <----
- GM Owner
- PC's
- Title
- Description

4. Model Three- Join_Requests <-----
- PC id
- Group id
- Join: Boolean, null

FORTHCOMING FEATURES ----
1. Model Four-Posts
2. Model Five-Messenger
3. Model Six-Conversation

--------
HTTP ENDPOINTS
--------

Home Page:

- GET ‘/login’ Gets the login page
- GET ‘/logout ‘ Logs the user out
- POST ‘/login ‘ Logs user in
- POST ‘/register’ Registers a user 

Users:

- GET ‘/user’ gets all the user (shows index page based on search results)
- POST ‘/user’ creates a user profile page
- DELETE ‘/user/:id’ deletes user profile
- PUT ‘/user/:id’ updates user profile
- GET ‘/user/:id’ show user page

Groups:

- GET ‘/group’ gets the user group page
- POST '/group' creates a group
- PUT '/group/:id' updates the group page
- DELETE /'group/:id' deletes group page
- GET '/group/join' gets the user group page of join requests
- POST '/group/join' adds users to the group page

-----------
WireFrames
-----------

https://imgur.com/3scgktI
https://imgur.com/5ntk2k3
https://imgur.com/gwPkIek
https://imgur.com/COudxap
https://imgur.com/kPFZXyh
https://imgur.com/vW0J8YD
https://imgur.com/MNzubrB
https://imgur.com/AggKr1j
https://imgur.com/8C30ykE
https://imgur.com/Xh5OMnH
