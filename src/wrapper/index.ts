import { Ccloud } from "./ccloud";

import {parseSideColumns} from "./parser";

let cc = new Ccloud();

(async () => {
  try {
    //await cc.ServiceAccounts.getServiceAccounts();
    //let sa: ServiceAccount = await cc.ServiceAccounts.createServiceAccount("TikaDemo", "Testing new Tika2");
    //await cc.ServiceAccounts.getServiceAccounts();
    //await cc.ServiceAccounts.deleteServiceAccount(sa.Id);
    //cc.login();
    let data : string[] = [];
    data.push("+-------------+--------------------------------+");
    data.push("| Id          |                          31977 |")
    data.push("| Name        | tika-test-03                   |")
    data.push("| Description | Oh noooooooooooooo adad        |")
    data.push("|             | adawryy 8asr 7dsf87ahyd 7a8sdy |")
    data.push("|             | 78aw7e3n                       |")
    data.push("+-------------+--------------------------------+")
    let resp = parseSideColumns(data);
    console.log(resp);
  } catch (e) {
    console.log("Error:", e);
  }
})();
