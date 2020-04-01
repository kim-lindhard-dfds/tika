import {ServiceAccountsInterface} from "./api/service-accounts";
import {ApiKeysInterface} from "./api/api-keys";
import {AccessControlListsInterface} from "./api/AccessControlListsInterface";
import {TopicsInterface} from "./api/TopicsInterface";
import {NotConnectedCCloudCliWrapper} from "./wrapper/notConnected/NotConnectedCCloudCliWrapper"
import {Ccloud} from "./wrapper/ccloud";
import {RequestLogger} from "./api/middleware/requestLoggerMiddleware";
const express = require("express");

const app = express();
app.use(express.json());
app.use(RequestLogger);

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

const accessControlListsInterface = new AccessControlListsInterface();

accessControlListsInterface.configureApp(
    cc.Kafka.AccessControlLists,
    app
);


const topicsInterface = new TopicsInterface();

topicsInterface.configureApp(
    cc.Kafka.Topics,
    app
);


const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`tika is listening on port ${port}...`);
});