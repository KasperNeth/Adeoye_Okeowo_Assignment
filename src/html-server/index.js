const http = require("http");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();


const HOSTNAME = "localhost";
const PORT = process.env.PORT || 3000;


const filePath = path.join(__dirname, "static", "index.html");
const noContentFilePath = path.join(__dirname, "static","404-page.html");

const requestHtmlHandler = ((req, res) => {
  if(req.url === "/" || req.url === "/index.html" || req.url === "/html"){
    return fs.readFile(filePath, ((err, fileData) => {
      if(err){
        return res.setHeader("Content-Type", "text/plain").writeHead(500).end("Internal Server Error: Error fetching data");
      }
      return res.setHeader("Content-Type", "text/html").writeHead(200).end(fileData);
    })) 
  }else {
    return fs.readFile(noContentFilePath, ((error, fileData) =>{
      if(error){
        return res.setHeader("Content-Type", "text/plain").writeHead(500).end("Internal Server Error: Error fetching data");
        
      }
      return res.setHeader("Content-Type", "text/html").writeHead(404).end(fileData)
    }))
  }
 

})


const server = http.createServer(requestHtmlHandler);
 

server.listen(PORT,HOSTNAME, () => {
  console.log(`Server is running on http://${HOSTNAME}:${PORT}`)
})

