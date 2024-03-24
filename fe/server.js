/* jshint esversion:6  */
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname,'build/')));

app.listen(port, () =>{
    console.log("Simplenotes active@port: "+port);
});