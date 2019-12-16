import { Ccloud } from "./ccloud";
import ServiceAccount from "./model/service-account";

let cc = new Ccloud();

(async () => {
  try {
    await cc.ServiceAccount.list();
    let sa: ServiceAccount = await cc.ServiceAccount.create("TikaDemo", "Testing new Tika2");
    await cc.ServiceAccount.list();
    await cc.ServiceAccount.delete(sa.Id);
  } catch (e) {
    console.log("Error:", e);
  }
})();
