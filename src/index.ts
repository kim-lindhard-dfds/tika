import {ServiceAccountsInterface} from "./api/service-accounts";
import {ApiKeysInterface} from "./api/api-keys";

import {NotConnectedCCloudCliWrapper} from "./wrapper/notConnected/NotConnectedCCloudCliWrapper"
import {Ccloud} from "./wrapper/ccloud";
const express = require("express");

const app = express();
app.use(express.json());



var cCloudCliWrapper= new NotConnectedCCloudCliWrapper();
let cc = new Ccloud();

const serviceAccountsInterface= new ServiceAccountsInterface();
serviceAccountsInterface.configureApp(
    cc.ServiceAccounts, 
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