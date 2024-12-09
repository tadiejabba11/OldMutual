const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const connection=require('./connection');
const qrcode=require('qrcode');
const ejs=require('ejs');
const { Html5Qrcode, Html5QrcodeScanner } = require('html5-qrcode');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Add this line to parse JSON bodies
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('application');
});

app.post('/', (req, res) => {
    
    
    var fullname=req.body.fullname;
    var RegNo=req.body.RegNo;
    var ID_No=req.body.ID_No;
    var Gender=req.body.Gender;
    var Programme=req.body.Programme;
    var Level=req.body.Level;
    var Email=req.body.Email; 
    
    
    connection.getConnection((error)=>{
    if(error){
      throw error
    }
    else{
     var sql ="INSERT INTO applicants(fullname,RegNo,ID_No,Gender,Email,Programme,Level)values(?,?,?,?,?,?,?)";
     connection.query(sql,[fullname,RegNo,ID_No,Gender,Email,Programme,Level], (error,result)=>{
      if (error){
        throw error
      }
      else{
      res.send("application sent succesfully")
      }
     })
    }
    })
   
      
    });


    app.get('/applicants', (req,res)=>{
        connection.getConnection((error)=>{
            if(error){
               console.log(error)
            }
            else{
                var SQl="select * from applicants";
                connection.query(SQl, (error, result)=>{
                    if (error){
                       throw(error)
                        
                    }
                    else{
                        res.render('applicants', { applicants: result });
                    }
                   
                })
            }
        })
    })

    app.get('/applicants_delete', (req, res) => {
        connection.getConnection((error) => {
            if (error) {
                console.log('Connection error:', error);
                res.status(500).send('Database connection error');
            } else {
                var RegNo = req.query.RegNo;
                var SQL = "DELETE FROM applicants WHERE RegNo = ?";

                // console.log(RegNo, req.query.RegNo)
    
                connection.query(SQL, [RegNo], (error, result) => {
                    if (error) {
                        console.log('Query error:', error);
                        res.status(500).send('Query execution error');
                    } else {
                        res.send('Deleted successfully');
                    }
                });
            }
        });
    });

    app.get("/entry",(req,res)=>{
        res.render('entry')  
    })


    app.post("/scan",(req,res,next)=>{
const dataToSend=req.body;


const Visitor_name=dataToSend.Visitor_name;
const RegNo=dataToSend.RegNo;
const ID_No=dataToSend.ID_No;
const Gender=dataToSend.Gender;
const Phone_Number=dataToSend.Phone_Number;
const Room_Number=dataToSend.Room_Number;
const Host_Name=dataToSend.Host_Name;

const input_text={
    Visitor_name:Visitor_name,
    RegNo: RegNo,
    ID_No:ID_No,
    Gender:Gender,
    Phone_Number:Phone_Number,
    Room_Number:Room_Number,
    Host_Name:Host_Name
}

const inputstr=JSON.stringify(input_text)

console.log(inputstr)

        qrcode.toDataURL(inputstr,(err,src) => {
    res.render('scan',{
        qr_code:src,
    });
    
        })
    })

  app.get("/scanner",(req,res)=>{
    res.render('scanner')
  }) 

  app.post("/scanner",(req,res)=>{

  


  })

port= 4500
app.listen(port,()=>{
    console.log(`we are cruising nicely on port ${port}`)
})



