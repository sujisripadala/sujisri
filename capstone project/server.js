const express = require("express");
const app =express();
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');

var admin = require("firebase-admin");

var serviceAccount = require("./tanujakey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:"https://console.firebase.google.com/project/application-75c5e/settings/serviceaccounts/adminsdk",

});

const db = getFirestore();

app.use(express.static("public"));

app.get("/signup", function(req, res){
    res.sendFile(__dirname + "/public/" + "signup.html");
});

app.get("/homename", function(req, res){
    res.sendFile(__dirname + "/public/" + "homename.html");
});

app.get("/signupSubmit", function(req, res){
    db.collection('currency').add({
        Firstname: req.query.Firstname,
        Lastname: req.query.Lastname,
        Email: req.query.Email,
        Password: req.query.Password,
        ConfirmPassword: req.query.ConfirmPassword
    }).then(()=>{
        res.send("signup successfully")
    })
});


app.get("/login", function(req, res){
    res.sendFile(__dirname + "/public/" + "login.html");
});


app.get("/logingIn", function(req, res){
    db.collection('currency')
    .where("Email", "==", req.query.Email)
    .where("Password", "==", req.query.Password)
    .get()
    .then((data)=>{
        if(data.empty){
            res.send("Not Successfull")
        }
        else{
            res.redirect("/homename")
        }
    })

});

app.listen(5000,function(){
    console.log('your port 5000 is connected')
});
