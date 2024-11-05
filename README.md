## First Altschool Backend Assignment



### Assignment overview

This is a backend project/assignment with Nodejs, using core NodeJs modules such as path, http, and file system(fs)

## #1 Assignment
Covers a simple http server that serves/renders a static html file if the `url` is  either `/index.html`, `/` or `html` and returns a simple web page of student data. And returns `404` page if the `url` does not match the above mentioned url.

## #2 Assignment
This covers a basic `CRUD` operation using the following request method `GET`, `POST`, `PUT` and `DELETE`.

The task is to create and manage an inventory of items in NodeJs. which allows the user to add, update, delete and view the items in the inventory.

The data is stored and manage in a `JSON` file not `database` and the data is read from the file and written to the file.

The codebase is expected to be `modular in nature`, `return consistent data structure`, `well documented` with `comments` and `proper error handling where possible`.


The codebase is expected to be `well structured` and `well organized` with `proper naming conventions` and `proper indentation`.



## usage

## #1 Assignment
To run the first assignment `html-server` run the following command

```bash
cd src/html-server
```
Install the dependencies by running the following command
```bash
npm install
```
Then run the following command to start the server
```bash
npm start
```
The server will start on port `3000` and you can access the server by visiting `http://localhost:3000` in your browser.

## #2 Assignment
To run the second assignment, `api-server`  run the following command

```bash
cd src/api-server
```
Install the dependencies by running the following command
```bash
npm install
```

Then run the following command to start the server
```bash
npm start
```
The server will start on port `3000` and you can access the server by visiting `http://localhost:3000` in your browser.

## Api endpoints
The following are the api endpoints for the second assignment
get all items
```bash
GET /items
```
get a single item
```bash
GET /items/:id
```
add a new item
```bash
POST /items
```
update an item
```bash
PATCH /items/:id
```
All the endpoints are prefixed with `/api/v1` e.g `http://localhost:3000/api/v1/items`
### Note
The `PATCH` request method `id` must be parsed on the url as a parameter e.g `http://localhost:3000/api/v1/items/1` and the `id` must be parsed along side the request body  e.g `{ "Name": "new name", "id": 1}` and the `id` must be the same as the `id` parsed on the url. 

The `POST` request method does not require the `id` to be parsed on the url, the `id` is generated automatically.

The `DELETE` request method `id` must be parsed on the url as a parameter only e.g `http://localhost:3000/api/v1/items/1` .




👤 **Author**
## Adeoye Okeowo
#### for any enquiry or question, you can reach me at the following
- GitHub: [@githubhandle](https://github.com/kasperNeth)
- Twitter: [@twitterhandle](https://twitter.com/KasperNeth)
- LinkedIn: [@LinkedIn](https://www.linkedin.com/in/adeoye-okeowo-245381334/)
- Gmail: [Email](mailto:Okeowa244@gmail.com)
- gmail: [gmail](mailto:okeowoa244@gmail.com)