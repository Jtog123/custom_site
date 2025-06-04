/*
Look into UTM

look into referrals

We need postgres because we are going to be logging
who, what, where, when, how and why

who: typically guests, as we cant make people log in, guest1, guest2 append a number to each guest
where: where are they coming from? have to use a UTM link to redirect them to my site
when: when did they arrive on the website
where: where are they going next, github or insta?



1. Begin testing who will will package logs and get UTM first then..
2. Set up DB basic connection and test


*/


import pg from 'pg'
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
dotenv.config({path: ".env"});
//dotenv.config({path: "/server/.env"});

const app = express();
const PORT = 4000;

app.use(cors());

app.use(express.json())

const { Pool, Client } = pg;

//console.log(Pool);







const createDBIfNoneExists = async (client) => {

    

    try {

        const res = await client.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = '${process.env.PG_NEW_DB}'`);

        //database does not exist, create it
        if(res.rowCount == 0) {
            console.log(`${process.env.PG_NEW_DB} database not found, creating it`);
            await client.query(`CREATE DATABASE "${process.env.PG_NEW_DB}";`);
            console.log(`created database ${process.env.PG_NEW_DB}`);

        } else {
            //it exists
            console.log(`${process.env.PG_NEW_DB} database exists.`);
        }
        

    } catch(err) {
        console.error("Error: ", err);
    }

}

/*

who: typically guests, as we cant make people log in, guest1, guest2 append a number to each guest
where: where are they coming from? have to use a UTM link to redirect them to my site
when: when did they arrive on the website
where: where are they going next, github or insta?

*/

const createTables = async(pool) => {
    //cerate tables if they dont already exist
    try {
        await pool.query("BEGIN");

        console.log('Creating tables\n')

        await pool.query(`
            CREATE TABLE IF NOT EXISTS visitor_analytics(
                visitor_analytics_id SERIAL PRIMARY KEY,
                username VARCHAR(10) DEFAULT 'guest',
                referral_site VARCHAR(50),
                time TIMESTAMP NOT NULL,
                link_clicked VARCHAR(50)
            )`
        );

        await pool.query("COMMIT");

    } catch(err) {
        await pool.query("ROLLBACK")
        console.error("Error: ", err);
    }

}

// Create a function that tracks which button was pressed , if github/ insta populate a table entry

const initDB = async() => {
        //try client i guess

    //Create initial connection
    const client = new Client({
        host: process.env.PG_HOST,
        user: process.env.PG_USER,
        password: process.env.PG_PASS,
        database:process.env.PG_DB,
        port: process.env.PG_PORT
    });



    //establish initial connection
    //create DB if it doesnt exist
    try {
        console.log("Connecting to client");
        await client.connect();
        await createDBIfNoneExists(client);

    } catch(err) {
        console.error("Error: ", err);
    } finally {
        //close the connection
        console.log("Client connection ending");
        await client.end();
    }


    //establish connection with new DB
    const pool = new Pool( {
        host: process.env.PG_HOST,
        user: process.env.PG_USER,
        password: process.env.PG_PASS,
        database:process.env.PG_NEW_DB,
        port: process.env.PG_PORT
    });



    try {
        //connect to new DB
        console.log(`Connecting the new DB ${process.env.PG_NEW_DB} with pool\n`);
        //await pool.query("SELECT NOW()");

        // Create table if they dont exist
        await createTables(pool);

    } catch(err) {
        console.log("Error:", err);
    } finally {
        //console.log(`Ending pool connection ${process.env.PG_NEW_DB}`);
        //await pool.end();
        //
    }


    console.log(`Ending pool connection ${process.env.PG_NEW_DB}`);
    await pool.end();

}

app.post('/', (req, res) => {
    console.log(req.body.platform_sent);

    res.send("We have recieved the button click");
})




const main = async () => {
    
    console.log("running main");

    //init the DB
    await initDB();



    //listen on this port, any problems listening here or do i want to listen beforehand?
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`)
    })



}



main();


