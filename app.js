import express from 'express';
import mintRouter from './router/mintRouter.js';
import transferRouter from './router/transferRouter.js';
import cors from 'cors';
import 'dotenv/config'
import fs from 'fs';
import http from 'http';
import https from 'https';
import connection from './tools/mysqlDatabase.js';
import eventRouter from './router/eventRouter.js';

const app = express();
const PORT = process.env.HTTPS_PORT || 33801;
const LOCAL_PORT = 5000;
app.use(cors());

const key_perm = process.env.KEY_PERM;
const cert_perm = process.env.CERT_PERM;


app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get('/test', async function (req, res) {
    const [members] = await connection.query("Select * from test_table");
    res.send({members});
});

app.use('/mint', mintRouter);
app.use('/transfer', transferRouter);
app.use('/event', eventRouter);


const httpsServer = https.createServer({
    key:  fs.readFileSync(key_perm),	
    cert: fs.readFileSync(cert_perm)
}, app);


httpsServer.listen(PORT, () => {
    console.log(`HTTPS Server running on port ${PORT}`);
});


const httpServer = http.createServer(app);

httpServer.listen(LOCAL_PORT, () => {
    console.log(`HTTP Server running on port ${LOCAL_PORT}`);
});



