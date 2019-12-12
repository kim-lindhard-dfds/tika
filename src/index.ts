import {ServiceAccountsInterface} from "./api/service-accounts";
const express = require("express");
const app = express();

app.use(express.json());

const port = process.env.port || 3000;


var a= new ServiceAccountsInterface();
a.configureApp(app);

app.listen(port, () => {
    console.log(`tika is listening on port ${port}...`);
});