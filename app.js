const mysql = require("mysql");
const pool = mysql.createPool({
    host: "",
    user: "",
    password: "",
    database: "",
    connectionLimit: 20,
})
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3306;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    pool.query("SELECT * FROM myTravelBlog", (error, results, fields) => {
        if (error) {
            console.log("error");
            res.status(500).send({ ok: false, error: error });
        } else {
            res.send({ ok: true, result: results });
        }
    })
});
app.get("/:id", (req, res) => {
    pool.query(`SELECT * FROM myTravelBlog WHERE id=?`,
        req.params.id,
        (error, results, fields) => {
            if (error) {
                console.log("error");
                res.status(500).send({ ok: false, error: error });
            } else {
                res.send({ ok: true, result: results });
            }
        });
});
app.put("/:id", (req, res) => {
    pool.query(
        `UPDATE myTravelBlog SET author= ? WHERE id= ?`,
        [req.body.editedPost, req.body.index],
        console.log("Now I#m here!"),
        (error, results, fields) => {
            if (error) {
                console.log("error");
                res.status(500).send({ ok: false, error: error });
            } else {
                console.log("some shit and no put happened?")
                res.send({ ok: true, result: results });
                console.log(res)
            }
        }
    );
    res.json("Thanks for updating your post");
});
app.delete("/", (req, res) => {
    pool.query(
        `DELETE FROM myTravelBlog WHERE id= ?`,
        req.body.index,
        (error, results, fields) => {
            if (error) console.log(error);
            return showCurrentStatus(res);
        });
});

app.post("/", (req, res) => {
    const dataToInsert = req.body;
    console.log(`posting: ${req.params.id}`)
    pool.query(
        "INSERT INTO myTravelBlog SET ?",
        dataToInsert,
        (error, results, fields) => {
            if (error)
                console.log(error);
        }
    );
    res.json("Thanks");
});
showCurrentStatus = (res) => {
    pool.query("SELECT * FROM myTravelBlog", (error, results, fields) => {
        if (error) {
            console.log(error);
            res.status(500).send({ ok: false, error: error });
        } else {
            res.send({ myTravelBlog: results });
        }
    });
};
app.listen(port, function () {
    console.log(`Running smoothly on port ${port}`);
});