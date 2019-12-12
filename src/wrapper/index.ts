import { Ccloud } from "./ccloud";

let cc = new Ccloud();

(async () => {
  try {
    await cc.ServiceAccount.list();
    //let clusters: any[] = await cc.Cluster.list();
  } catch (e) {
    console.log("Error:", e);
  }
})();
