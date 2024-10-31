const fs = require("fs");
const path = require("path");
const {validateItem,readFileFunction, writeFileFunction, updateItemValidation} = require("./helper-functions")


const itemDataBaseFilePath = path.join(__dirname, "../database", "items.json")
console.log(itemDataBaseFilePath)

//get all items from the database
const getAllIItems = ((req, res) => {
  fs.readFile(itemDataBaseFilePath, "utf8", (error, getItems) => {
    if(error){
      return res.writeHead(500).end(JSON.stringify({msg: "Error Fetching Data"}));
    }
    const items = JSON.parse(getItems);
    return res.writeHead(200).end(JSON.stringify({msg: "Retrieved All Item successfully", "getItems": items}));
  })

});

//get one item from the database by id
const getOneItem = ((req, res, id) => {
  //Make sure the parse id is numeric
  const parsedId = parseInt(id, 10);
  console.log(parsedId)
  if(isNaN(parsedId)){
    return res.writeHead(400).end(JSON.stringify({msg: "Bad Request Invalid id"}));
  }
  
  fs.readFile(itemDataBaseFilePath, "utf8", (error, getItems) => {
    if(error){
      return res.writeHead(500).end(JSON.stringify({msg: "Error Fetching Data"}));
    }
    const items = JSON.parse(getItems);
    // console.log(items)
    const findItem = items.find(((item) => item.id === parsedId))
    // console.log(findItem)
    
    if(!findItem){
      return res.writeHead(404).end(JSON.stringify({msg: "Item Not Found"}))
    }
    return res.writeHead(200).end(JSON.stringify({msg: "Item Found Successfully", findItem}))


  })

});

//create item in the database
const createItem = ((req, res) => {
  let body = [];
  req.on("data", ((chunkData) =>{
    body.push(chunkData);
  }))

  req.on("end", (() =>{
    parsedItem = Buffer.concat(body).toString();
    console.log(parsedItem)
    let newItem = JSON.parse(parsedItem);
    //allowed field when creating a new body to avoid sending unknown data to database
    const allowedKeys = ["Name", "Price", "Size"];

     //validate the body
    if (!validateItem(newItem, allowedKeys, res)) return;

     
    fs.readFile(itemDataBaseFilePath, "utf8", ((err, getItems) => {
    
      if(err){
        return res.writeHead(500).end(JSON.stringify({msg: "Error Fetching Data"}))
      }

      const items = JSON.parse(getItems);
      const lastId = items.length > 0 ? items[items.length -1].id : 0;
      newItem.id = lastId + 1;

      const updatedItem = [...items, newItem];
      
  
      fs.writeFile(itemDataBaseFilePath, JSON.stringify(updatedItem), ((err) => {
        if(err){
          return res.writeHead(500).end(JSON.stringify({msg: "Unable to save item"}))
        }
        return res.writeHead(201).end(JSON.stringify({msg: "Item Created Successfully", newItem}));
      }))


    }))

  }));


});

//update item in the database by id
const updateItem = ((req, res,id) => {
  let parsedId = parseInt(id, 10);
  console.log(parsedId)
  if(isNaN(parsedId)){
    return res.writeHead(400).end(JSON.stringify({msg: "Bad Request Ibvalid id"}));
  }
  let body = [];
  req.on("data", ((chunkData) =>{
    body.push(chunkData);
  }))
  req.on("end", (() =>{
    const parsedItem =Buffer.concat(body)
    let updateItem = JSON.parse(parsedItem)
    
    let itemId = parsedId;
    itemId = updateItem.id;
    //allowed field when creating a new body to avoid sending unknown data to database
    const allowedBodys = ["Name", "Price", "Size", "id"];

     //validate the item
    if (!updateItemValidation(updateItem, allowedBodys, res)) return;




    readFileFunction(itemId, res, (({items, findItem}) =>{
      items[findItem] = {...items[findItem], ...updateItem};
      // items[findItem] = updatedItem

    writeFileFunction(items, res, undefined,"Item Updated Successfully")
    }))

  
  

  }))

  

});


const deleteItem = ((req, res, id) => {
  console.log(deleteItem)

  const parsedId = parseInt(id, 10);
  console.log(parsedId)
  if(isNaN(parsedId)){
     return res.writeHead(400).end(JSON.stringify({msg: "Bad Request Invalid id"}));
  }

  readFileFunction((parsedId), res, (({items, findItem}) =>{
    items.splice(findItem, 1);
  
  writeFileFunction(items, res,undefined, "Item Deleted Successfully")
  }))


 

});


module.exports ={
  getAllIItems,
  getOneItem,
  createItem,
  updateItem,
  deleteItem
}




