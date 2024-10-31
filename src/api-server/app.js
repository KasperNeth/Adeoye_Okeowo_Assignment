const http = require('http');
const dotenv = require('dotenv');
const {getAllIItems,getOneItem,createItem,updateItem,deleteItem} = require("./controller/handler-function")

dotenv.config();


const HOSTNAME = "localhost";
const PORT = process.env.PORT || 3000;

//request handler for all route
const requestHandler = ((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if(req.url === "/api/v1/items" && req.method ==="GET"){
    getAllIItems(req, res);

  }else if (req.url === "/api/v1/items" && req.method === "POST"){ 
    createItem(req, res)

   //getting parameter from the url using match method,split and regular expression
  }else if (req.url.match(/\/api\/v1\/items\/([^\/]+)/) && req.method === "PATCH"){
    const id = req.url.split("/")[4];
    updateItem(req, res, id)

  }else if(req.url.match(/\/api\/v1\/items\/([^\/]+)/) && req.method ==="GET"){
    const id = req.url.split("/")[4];
    getOneItem(req, res, id)
   
  }else if(req.url.match(/\/api\/v1\/items\/([^\/]+)/) && req.method === "DELETE"){
    const id = req.url.split("/")[4];
    deleteItem(req, res, id)

  }else{
    return res.writeHead(404).end(JSON.stringify({msg: "Route does not exist"}))
  }
})









//creating server
const server = http.createServer(requestHandler);


server.listen(PORT, HOSTNAME,() => {
  console.log(`Server is running on http://${HOSTNAME}:${PORT}`)

})



