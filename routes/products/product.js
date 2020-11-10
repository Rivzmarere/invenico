const express = require('express');
let router = express.Router()

router.post("/add-product", (req, res) => {
    var Products = Parse.Object.extend("Product"); // 
    var product = new Products(); //

  product.save({
    ...req.body
  })
  .then((result) => {
    // The object was saved successfully.
    res.json({success: true, result}).status(201);
  }, (error) => {
    res.json({success: false, ...error}).status(400);
  });
 });

 router.get("/view-products",(req,res)=>{
    var Products = Parse.Object.extend("Product");
    var query = new Parse.Query(Products);

    query
    .find()
    .then(products=>{
      res.json({success: products}).status(200);
    },error =>{
      res.json(error).status(400);
    });
  });

 router.get("/get-product-by-id",(req,res)=>{
    const Products = Parse.Object.extend('Product');
    const query = new Parse.Query(Products)
    
   const id = req.body.id;

   query.get(id)
   .then(products =>{
     res.json({success: true, products}).status(200);
   }, error => {
      res.json({success: false, products: [],...error}).status(400);
   })
  })

  
  router.get("/get-product-by-name",(req,res)=>{
    const Products = Parse.Object.extend('Product');
    const query = new Parse.Query(Products);
    query.equalTo("companyName","probrand");
    const results = query.find()
    .then(products =>{
      res.json({success: true, products}).status(200);
    }, error => {
       res.json({success: false, products: [],...error}).status(400);
    });
  });

  router.get("/get-product-by-product-code",(req,res)=>{
    const Products = Parse.Object.extend('Product');
    const query = new Parse.Query(Products);
    query.equalTo("Productcode","");
    const results = query.find()
    .then(products =>{
      res.json({success: true, products}).status(200);
    }, error => {
       res.json({success: false, products: [],...error}).status(400);
    });
  });

  router.put('/update-product/:id',(req,res) =>{
    var Product =Parse.Object.extend('Product');
    var query = new Parse.Query(Product);

    var id =req.params.id;

    query
    .get(id)
    .then((product) => {
        product.save({
        ...req.body
        });
          res.json({product}).status(200);
        })
        .catch(error => {
         console.log(error);
         res.json({success:false,...error}).status(400);
  });
  });

  router.delete('/delete-product-by-id/:id',(req,res)=>{
    var Products = Parse.Object.extend('Product');
    var query = new Parse.Query(Products);

    var id = req.params.id;
    query
    .get(id)
    .then((product)=>
    product.destroy()
    .then(res.json({success:true,product}).status(200))
    )
    .catch(error => {
      console.log(error);
      res.json({success:false,...error}).status(400);
    }) ;
  });

module.exports = router;