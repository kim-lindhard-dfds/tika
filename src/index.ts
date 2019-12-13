import {ServiceAccountsInterface} from "./api/service-accounts";
import {ApiKeysInterface} from "./api/api-keys";

import {NotConnectedCCloudCliWrapper} from "./wrapper/notConnected/NotConnectedCCloudCliWrapper"
const express = require("express");

const app = express();
app.use(express.json());



var cCloudCliWrapper= new NotConnectedCCloudCliWrapper();

const serviceAccountsInterface= new ServiceAccountsInterface();
serviceAccountsInterface.configureApp(
    cCloudCliWrapper.ServiceAccounts, 
    app
);

const apiKeysInterface = new ApiKeysInterface();

apiKeysInterface.configureApp(
    cCloudCliWrapper.ApiKeys,
    app
);

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`tika is listening on port ${port}...`);
});