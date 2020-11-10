const express = require('express');
let router = express.Router();

router.post("/company", (req, res) => {
    var Companies = Parse.Object.extend("Company"); // Companies class
    var company = new Companies(); // Company object
  
  company.save({
    company: req.body.company,
    address: req.body.address,
    email: req.body.email,
    contact: req.body.contact,
    companyId:req.body.companyId,
    cr14:req.body.cr14,//cr-company registration
    cr2:req.body.cr2,//cr-company registration
    cor:req.body.cor,//cr-company registration
    coi:req.body.coi//cr-company registration
  })
  .then((result) => {
    // The object was saved successfully.
    res.json({success: true, result}).status(201);
  }, (error) => {
    res.json({success: false, ...error}).status(400);
  });
  });

  router.post("/individual", (req, res) => {
    var Individuals = Parse.Object.extend("Individual");
    var individual = new Individuals();
    console.log(req.body);
  
  individual.save({
    name: req.body.name,
    surname: req.body.surname,
    email:req.body.email,
    contact: req.body.contact, 
    idNumber:req.body.idNumber,
    gender:req.body.gender,
    address:req.body.address,
    por:req.body.por,// por-proof of residence 
    idPicture:req.body.idPicture  
  })
  .then((result) => {
    // The object was saved successfully.
    res.json({success: true, result}).status(201);
  }, (error) => {
    res.json({success: false, ...error}).status(400);
  });
   
  });

  router.get("/view-companies",(req,res)=>{
    var Companies = Parse.Object.extend("Company");
    var query = new Parse.Query(Companies);

    query
    .find()
    .then(companies=>{
      res.json({success: companies}).status(200);
    },error =>{
      res.json({companies:[]}).status(400);
    });
  });

  router.get("/view-individuals",(req,res)=>{
    var Individuals = Parse.Object.extend("Individual");
    var query = new Parse.Query(Individuals);

    query
    .find()
    .then(individuals=>{
      res.json({individuals: individuals}).status(200);
    }, error =>{
      res.json({individuals:[]}).status(400);
    });
    });

    router.get("/get-companies-by-id/:id",(req,res)=>{
      var Companies = Parse.Object.extend('Company');
      var query = new Parse.Query(Companies)
      
     var id = req.params.id;
     query.get(id)
     .then(companies =>{
       res.json({success: true, companies}).status(200);
     }, error => {
        res.json({success: false, companies: [],...error}).status(400);
     })
    })

    router.get("/get-individuals-by-id/:id",(req,res)=>{
      var Individuals = Parse.Object.extend('Individual');
      var query = new Parse.Query(Individuals)
      
     var id = req.params.id;
     query.get(id)
     .then(individuals =>{
       res.json({success: true, individuals}).status(200);
     }, error => {
        res.json({success: false, individuals: [],...error}).status(400);
     })
    })
    
  router.put('/update-company/:id',(req,res) =>{
      var Company =Parse.Object.extend('Company');
      var query = new Parse.Query(Company);

      var id =req.params.id;

      query
      .get(id)
      .then((company) => {
          company.save({
          ...req.body
          });
            res.json({company}).status(200);
          })
          .catch(error => {
           console.log(error);
           res.json({success:false,...error}).status(400);
    });

    });

    router.put('/update-individual/:id',(req,res) =>{
      var Individuals =Parse.Object.extend('Individual');
      var query = new Parse.Query(Individuals);

      var id =req.params.id;

      query
      .get(id)
      .then((individual) => {
          individual.save({
          ...req.body
          });
            res.json({individual}).status(200);
          })
          .catch(error => {
           console.log(error);
           res.json({success:false,...error}).status(400);
    });

    });

  router.delete('/delete-company-by-id/:id',(req,res)=>{
    var Companies = Parse.Object.extend('Company');
    var query = new Parse.Query(Companies);

    var id = req.params.id;
    query
    .get(id)
    .then((company)=>
    company.destroy()
    .then(res.json({success:true,company}).status(200))
    )
    .catch(error => {
      console.log(error);
      res.json({success:false,...error}).status(400);
    });
  });
  
  router.delete('/delete-individual-by-id/:id',(req,res)=>{
    var Individuals = Parse.Object.extend('Individual');
    var query = new Parse.Query(Individuals);

    var id =req.params.id;
    query
    .get(id)
    .then((individual)=>
    individual.destroy()
    .then(res.json({success:true,individual}).status(200))
    )
    .catch(error => {
      console.log(error);
      res.json({success:false,...error}).status(400);
    });
  });


module.exports = router;