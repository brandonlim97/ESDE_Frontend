
const express=require('express');
const serveStatic=require('serve-static');


//var hostname="ec2-18-142-26-4.ap-southeast-1.compute.amazonaws.com";
var port= process.env.PORT || 3001;


var app=express();


app.use(function(req,res,next){
    console.log(req.url);
    console.log(req.method);
    console.log(req.path);
    console.log(req.query.id);
    //Checking the incoming request type from the client
    if(req.method!="GET"){
        res.type('.html');
        var msg='<html><body>This server only serves web pages with GET request</body></html>';
        res.end(msg);
    }else{
        next();
    }
});


app.use(serveStatic(__dirname+"/public"));


app.get("/", (req, res) => {
    res.sendFile("/public/home.html", { root: __dirname });
});


app.listen(port,function(){

    console.log(`Server hosted at ${port}`);
});