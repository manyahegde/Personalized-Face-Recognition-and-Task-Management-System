const { Client } = require("pg")
const express = require("express");
const cors = require("cors");
const PORT = 5000;

const app = express()
app.use(cors());
app.use(express.json());

// 9UeYyPtafflpwYrn

const db = new Client("postgres://postgres.wagbwdxeilwoseaioixc:9UeYyPtafflpwYrn@aws-0-ap-south-1.pooler.supabase.com:5432/postgres");

app.listen(PORT, () => {
    db.connect(() => {
        console.log("Connection establised");
    },(err) => {
        console.log(err);
    })
    console.log("Server running at Port : ", PORT);
})

app.get("/",async(req,res) => {
    const data = await db.query("SELECT * FROM todolist;")
    console.log(data.rows);
    return res.send({rows:data.rows , message: "done"},200)
})

app.get("/api/getTodoList",async(req,res) => {
    const name = req.query["name"];
    const data = await db.query(`SELECT * FROM todolist WHERE name='${name}';`)
    return res.send({rows:data.rows , message: "done"},200)
})
