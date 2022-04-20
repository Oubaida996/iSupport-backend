## User Management Routes

| Method | Route            | Function                                    |
|--------|------------------|---------------------------------------------|
| POST   | /signup          | Creates a new account                       |
| POST   | /signin          | Signs in using basic auth                   |
| GET    | /user/logout/:id | Logout user                                 |
| GET    | /users           | Returns All Users Information               |
| GET    | /user/:id        | Returns Single user Information by User ID  |
| PUT    | /user/:id        | Update Single user Information by User ID   |
| DELETE | /user/:id        | Deletes User Account                        |

## Community Management Routes

| Method | Route                           | Function                                                      |
|--------|---------------------------------|---------------------------------------------------------------|
| POST   | /community                      | Creates a New Community                                       |
| GET    | /communities                    | Get All Communities Information                               |
| GET    | /community/:id                  | Get a Single Community Information by Community ID            |
| GET    | /search                         | Search The Communities List                                   |
| DELETE | /community/:id                  | Deletes a Community                                           |
| GET    | /join-community/:id             | Join a community                                              |
| GET    | /trending                       | Returns Most Trending Communities                             |
| GET    | /community/:id/personalProgress | Returns Personal Progress For Logged in User by Community ID  |
| GET    | /user/:id/communities           | Returns a List of Joined Communites For Logged in User        |


## Post Managment Routes

| Method | Route                              | Function                                     |
|--------|------------------------------------|----------------------------------------------|
| POST   | /community/:id/create-post         | Creates a New Post in a Joined Commuity      |
| GET    | /community/:id/get-posts           | Get All Communities Information              |
| GET    | /community/:id/search              | Search The Posts In a Certain Community      |
| PATCH  | /update-post/:id                   | Search The Communities List                  |
| DELETE | /community/:id/delete-post/:postId | Deletes a Post By Community ID and Post ID   |
| GET    | /user/:id/get-all-posts            | Returns All Posts by a Certain Use           |
| GET    | /posts/community/:id               | Returns All Postsin a Community              |
| GET    | /user/:id/community/:cid           | Returns All Posts by a User in a Community   |
| GET    | /community/:id/live-chat           | Opens a New Group Chat Room For a Community  |