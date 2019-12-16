import { Ccloud } from "./ccloud";

let cc = new Ccloud();

(async () => {
  try {
    await cc.ServiceAccounts.getServiceAccounts();
    let sa: ServiceAccount = await cc.ServiceAccounts.createServiceAccount("TikaDemo", "Testing new Tika2");
    await cc.ServiceAccounts.getServiceAccounts();
    await cc.ServiceAccounts.deleteServiceAccount(sa.Id);
  } catch (e) {
    console.log("Error:", e);
  }
})();
