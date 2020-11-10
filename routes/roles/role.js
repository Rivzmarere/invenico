const express = require('express');
let router = express.Router();

router.post("/add-role", (req, res) => {  
    var roleACL = new Parse.ACL();
    roleACL.setPublicReadAccess(true);
    var role = new Parse.Role("Operator", roleACL);
    role.save()
    .then((result) => {
     // The object was saved successfully.
     res.json({success: true, result}).status(201);
   }, (error) => {
     res.json({success: false, ...error}).status(400);
   });
 });

module.exports = router;