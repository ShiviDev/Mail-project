const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
  apiKey: "687473e57e368f045bf2a741ddc7368e-us7",
  server: "us7",
});

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",async function(req,res){
    var email = req.body.Email;
    var firstName=req.body.FirstName;
    var lastName=req.body.LastName;
    const listId="95b534181d";
    
    const run = async () => {
      const myListObj = {
        email_address: email,
        status: "subscribed",
        merge_fields: {
            FNAME: firstName,
            LNAME: lastName
            }
       }
       try {
        const response = await client.lists.addListMember(listId,myListObj);
        res.sendFile(__dirname+"/success.html")
    
       }
    catch(err) {
        
        console.log(err.statusCode)
        res.sendFile(__dirname+"/failure.html")
    
    
    }
      console.log(response);
    };
    run();
});

app.post("/failure",function(req,res){
  res.redirect("/")
});

app.listen(3000, function(){
    console.log("server is running on port 3000");
});

//687473e57e368f045bf2a741ddc7368e-us7

//id 95b534181d

