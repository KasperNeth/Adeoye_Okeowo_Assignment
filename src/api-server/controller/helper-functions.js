const fs = require("fs");
const path = require("path")



const itemDataBaseFilePath = path.join(__dirname, "../database", "items.json")

const validateItem = (item, allowedKeys, res) => {
  //chec
  const invalidItem = Object.keys(item).filter(key => !allowedKeys.includes(key));
  if (invalidItem.length > 0) {
    res.writeHead(400).end(
      JSON.stringify({ msg: `unaccepted input field: ${invalidItem.join(", ")}` })
    );
    return false; // when for allowed keys validation failed
  } else if (typeof item.Name !== "string" || typeof item.Price !== "number" || typeof item.Size !== "string") {
    res.writeHead(400).end(JSON.stringify({ msg: "Invalid body field" }));
    return false; //return when validation failed and send back msg to the user
  }
  return true; //return when validation passed

}


//readFile controller function
const readFileFunction = ((itemId, res, callBackFun) =>{
  fs.readFile(itemDataBaseFilePath, "utf8", ((err, getItems) => {
    if(err){
      return res.writeHead(500).end(JSON.stringify({msg: "Error Fetching Data"}));

    }
    const items = JSON.parse(getItems);
    //search for the index in database
    const findItem = items.findIndex(((item) => item.id === itemId))

    if(findItem === -1){
      return res.writeHead(404).end(JSON.stringify({msg: "item Not Found"}))
    }
    let item = items[findItem];
    callBackFun({item, findItem, items})

  }))

  

})


//writeFile controller function
const writeFileFunction =((items, res, resCode=200, resMsg="successful")=> {
  fs.writeFile(itemDataBaseFilePath, JSON.stringify(items), ((err) => {
    if(err){
      return res.writeHead(500).end(JSON.stringify({msg: "Unable to save data"}));
    }
    console.log(resCode)
    return res.writeHead(resCode).end(JSON.stringify({msg: resMsg}));
  }))


})

module.exports = {
  validateItem,
  readFileFunction,
  writeFileFunction
}