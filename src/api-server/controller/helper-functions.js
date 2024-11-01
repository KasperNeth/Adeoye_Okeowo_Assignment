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
    return false; // when  allowed keys validation failed
  } else if (typeof item.Name !== "string" || typeof item.Price !== "number" || typeof item.Size !== "string") {
    res.writeHead(400).end(JSON.stringify({ msg: "Invalid value field" }));
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
    //parse the data from the database
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
      return res.writeHead(500).end(JSON.stringify({msg: "Unable to save data"}));
    }
    console.log(resCode)
    return res.writeHead(resCode).end(JSON.stringify({msg: resMsg, returnItem}));
  }))


})

const updateItemValidation = (updatedItem, allowedBodys, itemId, res) => {
  const invalidItem = Object.keys(updatedItem).filter(body => !allowedBodys.includes(body));
  console.log(invalidItem)
  if (invalidItem.length > 0) {
    res.writeHead(400).end(
      JSON.stringify({ msg: `unaccepted input field.Must start with capital letter: ${invalidItem.join(", ")}` })
    );
    return false; 
  }
  if(updatedItem.Name !== undefined && typeof updatedItem.Name !== "string"){
    res.writeHead(400).end(JSON.stringify({msg: "Invalid value field: Name must be a string"}))
    return false;
  }
  if(updatedItem.Price !== undefined && typeof updatedItem.Price !== "number"){
    res.writeHead(400).end(JSON.stringify({msg: "Invalid value field: Price must be a number"}))
    return false;
  }
  if(updatedItem.Size !== undefined && typeof updatedItem.Size !== "string"){
    res.writeHead(400).end(JSON.stringify({msg: "Invalid value field: Size must be a string"}))
    return false;
  }
   
  if (!updatedItem.id || updatedItem.id !== itemId) {
    res.writeHead(400).end(JSON.stringify({ msg: "Bad Request: ID must be parse in body and must match URL ID" }));
    return false;
  }

  const updateFields = Object.keys(updatedItem).filter(body => body !== "id" && allowedBodys.includes(body));

 
  if (updateFields.length === 0) {
    res.writeHead(400).end(JSON.stringify({ msg: "Valid update properties not provided" }));
    return false;
  }
  return true;

}



module.exports = {
  validateItem,
  readFileFunction,
  writeFileFunction,
  updateItemValidation
}