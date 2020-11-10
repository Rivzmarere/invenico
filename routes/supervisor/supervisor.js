const express = require('express');
let router = express.Router();

router.post('/play',(req,res)=>{
    res('hey');
})

module.exports = router;