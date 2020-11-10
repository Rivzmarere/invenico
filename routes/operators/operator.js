const express = require('express');
let router = express.Router();

router.post("/receipt", (req, res) => {
    var Receipts = Parse.Object.extend("Receipt"); // Receipt class
    var receipt = new Receipts(); // Receipt object
  
  receipt.save({
    ...req.body  
  })
  .then((result) => {
    // The object was saved successfully.
    res.json({success: true, result}).status(201);
  }, (error) => {
    res.json({success: false, ...error}).status(400);
  });
})

/*
app.post("/signup", (req, res) => {
  var user = new Parse.User();
  user.set({
    ...req.body
  })
try {
  user.signUp();
  res.json({success: true, user}).status(201);
} catch (error) {
  // Show the error message somewhere and let the user try again.
  res.json({success: false, ...error}).status(400);}
})
*/

router.get("/login", (req, res) => {
  var user = Parse.User.logIn("rivaldodrfrrrocdjhcoered", "frfrf")
        .then(function(user) {
         console.log('User Logged in   with name: ' + user.get("username") + ' and email: ' + user.get("email") );
    }).catch(function(error){
        console.log("Error: " + error.code + " " + error.message);
    });
})

router.post('/password-reset',(req,res) => {
  Parse.User.requestPasswordReset("rivzmarere@gmail.com")
.then(() => {
  // Password reset request was sent successfully
}).catch((error) => {
  // Show the error message somewhere
  alert("Error: " + error.code + " " + error.message);
});

})

module.exports = router;