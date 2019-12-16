import {ServiceAccountsInterface} from "./api/service-accounts";
import {ApiKeysInterface} from "./api/api-keys";

import {NotConnectedCCloudCliWrapper} from "./wrapper/notConnected/NotConnectedCCloudCliWrapper"
import {Ccloud} from "./wrapper/ccloud";
const express = require("express");

const app = express();
app.use(express.json());

var cc: CCloudCliWrapper;

const apiImplementationToUse = process.env.TIKA_API_IMPLEMENTATION || "connected";

console.log("Using api implementation:", apiImplementationToUse);
switch (apiImplementationToUse.valueOf()) {
    case "notconnected".valueOf():
        cc = new NotConnectedCCloudCliWrapper();
        break;
    case "connected".valueOf():
        cc = new Ccloud();
        break;
    default:
        cc = new Ccloud();
}

const serviceAccountsInterface = new ServiceAccountsInterface();
serviceAccountsInterface.configureApp(
    cc.ServiceAccounts, 
    app
);

const apiKeysInterface = new ApiKeysInterface();

apiKeysInterface.configureApp(
    cc.ApiKeys,
    app
);

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`tika is listening on port ${port}...`);
});