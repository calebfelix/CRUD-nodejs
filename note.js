// Requiring fs module
const fs = require("fs");

// Storing the JSON format data in myObject
var data = fs.readFileSync("data.json");
var myObject = JSON.parse(data);

var args = process.argv.slice(2);

var ERROR = `
Invalid Syntax!!!
+----------------------------------------------------------------+
| How to use? -                                                  | 
|                                                                |
| ADD Note:                                                      |
|    node note.js add --title="TITLE" --body="BODY"              |
|                                                                |
| DELETE Note:                                                   |
|    node note.js remove --title="TITLE"                         |
|                                                                |
| LIST Notes:                                                    |
|    node note.js list                                           |
|                                                                |
| READ Notes:                                                    |
|   node note.js read --title="TITLE"                            |
|                                                                |
+----------------------------------------------------------------+
`


//===============================================================================================================================================================

try{

if (args[0] === "add") {
  // User Input
  var title = args[1];
  var body = args[2];
  var titleArr = title.split("=");
  var bodyArr = body.split("=");

  let newData = {
    title: titleArr[1],
    body: bodyArr[1],
  };

  // Adding the new data to our object
  myObject.push(newData);
  // Writing to our JSON file
  var newData2 = JSON.stringify(myObject, null, 2);
  fs.writeFile("data.json", newData2, (err) => {
    // Error checking
    if (err) throw err;
    console.log("New Note Created!");
  });


} else if (args[0] === "remove") {
  var title = args[1];
  var titleArr = title.split("=");

  fs.readFile("data.json", (err, data) => {
    if (err) throw err;
    obj = JSON.parse(data);
    var filtered = obj.filter((item) => {
      return item.title !== titleArr[1];
    });
    console.log(filtered);
    var newData2 = JSON.stringify(filtered);
    fs.writeFile("data.json", newData2, (err) => {
      // Error checking
      if (err) throw err;
      console.log("Note removed!");
    });
  });


} else if (args[0] === "list") {
    fs.readFile("data.json", (err, data) => {
        if (err) throw err;
        obj = JSON.parse(data);
        console.log("Your Notes:");
        for (let i = 0; i < obj.length; i++) {
            console.log(obj[i].title);
        }      
    }) 


} else if (args[0] === "read") {
    var title = args[1];
    var titleArr = title.split("=");

    fs.readFile("data.json", (err, data) => {
        if (err) throw err;
        obj = JSON.parse(data);
        var result = obj.filter(function(e){return e.title == titleArr[1]})
        console.log(result[0].body); 
    })


} else {
  console.log(ERROR);
}
}catch(err){
  console.log(ERROR)
}