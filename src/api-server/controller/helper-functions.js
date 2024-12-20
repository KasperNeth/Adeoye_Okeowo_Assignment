const fs = require("fs");
const path = require("path")


//Path to the database file
const itemDataBaseFilePath = path.join(__dirname, "../database", "items.json")



//readFile controller function
const readFileFunction = ((itemId, res, callBackFun) =>{
  fs.readFile(itemDataBaseFilePath, "utf8", ((err, getItems) => {
    if(err){
      return res.writeHead(500).end(JSON.stringify({msg: "Internal Server Error: Error Fetching Data"}));

    }
  
    const updateItems = JSON.parse(getItems);
    //search for the index in database
    const findItem = updateItems.findIndex(((item) => item.id === itemId))

    if(findItem === -1){
      return res.writeHead(404).end(JSON.stringify({msg: "item Not Found"}))
    }
    //return the item and the index
    updateItems[findItem];
    
    callBackFun({findItem, updateItems})

  }))

  

})


//writeFile controller function
const writeFileFunction =((updateItems, res, resCode=200, resMsg="successful",returnItem)=> {
  fs.writeFile(itemDataBaseFilePath, JSON.stringify(updateItems), ((err) => {
    if(err){
      return res.writeHead(500).end(JSON.stringify({msg: "Internal Server Error: Unable to save data"}));
    }
    return res.writeHead(resCode).end(JSON.stringify({msg: resMsg, returnItem}));
  }))


})


module.exports = {
  readFileFunction,
  writeFileFunction,
}