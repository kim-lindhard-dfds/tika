import {ServiceAccountsInterface} from "./api/service-accounts";
import {NotConnectedCCloudCliWrapper} from "./wrapper/notConnected/NotConnectedCCloudCliWrapper"
const express = require("express");

const app = express();
app.use(express.json());


const serviceAccountsInterface= new ServiceAccountsInterface();

var cCloudCliWrapper= new NotConnectedCCloudCliWrapper();

serviceAccountsInterface.configureApp(
    cCloudCliWrapper.ServiceAccounts, 
    app
);

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`tika is listening on port ${port}...`);
});