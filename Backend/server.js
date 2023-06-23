const express = require('express');
const cors = require('cors');
const sql = require('mysql');
const fs = require('fs');


const port = 4001;
const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON body


const db = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "timeline"
})
db.connect((err) => {
    if (err) {
        console.log("Error in connection");
        return;
    }
    else {
        console.log("Connected to Database");
    }
})


app.get("/users", (req, res) => {
    console.log("in users");
    const q = "SELECT * FROM usertimeline";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        const userdata = res.json(data);
        return (
            // res.json(data)
            userdata
        )
    })
})

const uid = "user2";
app.get("/users/path", (req, res) => {
    console.log("in users");
    // const q = "SELECT * FROM usertimeline";
    const q = "SELECT latitude,longitude from usertimeline where userid=?";
    db.query(q, [uid], (err, data) => {
        console.log("in user path");
        if (err) return res.json(err);
        res.json(data);
    })
})
app.get("/users/time", (req, res) => {
    console.log("in timelinetable");
    // const q = "SELECT * FROM usertimeline";
    const q = "SELECT start_time,stop_time from timelinetable";
    db.query(q, (err, data) => {
        console.log("in user path");
        if (err) return res.json(err);
        res.json(data);
    })
})

app.get("/users/useriddata", (req, res) => {
    console.log("in users id");
    // const q = "SELECT * FROM usertimeline";
    const q = "SELECT id,user_name from users";
    db.query(q, (err, data) => {
        console.log("in user path");
        if (err) return res.json(err);
        // console.log(data);
        res.json(data);
    })
})


app.get('/', (req, res) => {

    return res.json("From backend");

})

app.post("/users/userData", async (req, res) => {
    const userId = req.body;

    console.log("usid : ", userId);
    let usid = Object.values(userId);
    let uid = usid[0];
    let udate = usid[1];
    console.log("usid", uid);
    console.log("usid", udate);



    // res.json(userId);


    // const query = "SELECT DISTINCT dt_userstimeline_dr.date_entered,dt_userstimeline_dr.latitude,dt_userstimeline_dr.longitude FROM dt_userstimeline_dr,users WHERE users.id = dt_userstimeline_dr.assigned_user_id AND DATE(dt_userstimeline_dr.date_entered)=?  AND users.id =?";
    // console.log(query);
    // const query="select * from dt_userstimeline_dr where date(dt_userstimeline_dr.date_entered)='2023-06-17'";
    const query = "SELECT distinct dt_userstimeline.date_entered,dt_userstimeline.latitude,dt_userstimeline.longitude FROM dt_userstimeline,users WHERE users.id = dt_userstimeline.assigned_user_id AND DATE(dt_userstimeline.date_entered) =? AND users.id = ?";
    db.query(query, [udate, uid], (error, results) => {
        if (error) {
            console.error('Error fetching user data:', error);
            res.status(500).json({ error: 'Failed to fetch user data' });
            return;
        }

        // if (results.length === 0) {
        //     res.status(404).json({ error: 'User not found' });
        //     return;
        // }

        // console.log("results ", results);
        const userData = results;

        // console.log("userdata", userData);
        fs.writeFile('userdata.json', JSON.stringify(userData, null, 2), err => {
            if (err) {
                console.error('Error storing user data:', err);
                // res.status(500).send('Internal Server Error');
            } else {
                console.log('User data stored successfully');
            }
        });
        res.json(userData);
    });

});

app.listen(port, () => {
    console.log("on port ", port)
})


