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
dotenv.config({path:"./server/.env"});

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

const createTables = async(pool) => {
    //cerate tables if they dont already exist
    try {

    } catch(err) {
        console.error("Error: ", err);
    }

}

// Create a db if it does not already exist

//Connect the server to the pg server

// Create a table if it does not already exist



const main = async () => {
    
    console.log("running main");



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
        await pool.query("SELECT NOW()");

        // Create table if they dont exist
        await createTables(pool);

    } catch(err) {
        console.log("Error:", err);
    } finally {
        console.log(`Ending pool connection ${process.env.PG_NEW_DB}`);
        await pool.end();
        //
    }
}

main();


