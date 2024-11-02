
const updateItemValidation = (updatedItem, allowedBodys, itemId, res) => {
  //check if the right updateditem body is provided in the request
  const invalidItem = Object.keys(updatedItem).filter(body => !allowedBodys.includes(body));
  if (invalidItem.length > 0) {
    res.writeHead(400).end(
      JSON.stringify({ msg: `unaccepted input field.Must start with capital letter: ${invalidItem.join(", ")}` })
    );
    return false; 
  }
  //check if the updateditem is the right data type is provided
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
   //check if the updateditem id is provided and it matches the url id
  if (!updatedItem.id || updatedItem.id !== itemId) {
    res.writeHead(400).end(JSON.stringify({ msg: "Bad Request: ID must be parse in body and must match URL ID" }));
    return false;
  }
  //get the updateditem fields
  const updateFields = Object.keys(updatedItem).filter(body => body !== "id" && allowedBodys.includes(body));

 //check if the updateditem is not empty
  if (updateFields.length === 0) {
    res.writeHead(400).end(JSON.stringify({ msg: "Valid update item not provided" }));
    return false;
  }
  return true;

}



const validateItem = (item, allowedKeys, res) => {
  if (!item) {
    res.writeHead(400).end(JSON.stringify({ msg: "No item provided" }));
    return false; //return when no item is provided
  }
  if (Object.keys(item).length === 0) {
    res.writeHead(400).end(JSON.stringify({ msg: "Empty item provided" }));
    return false; //return when empty item is provided
  }
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

module.exports = {
  validateItem,
  updateItemValidation
}