import { Ccloud } from "./ccloud";

let cc = new Ccloud();

(async () => {
  try {
    await cc.ServiceAccount.list();
  } catch (e) {
    console.log("Error:", e);
  }
})();
