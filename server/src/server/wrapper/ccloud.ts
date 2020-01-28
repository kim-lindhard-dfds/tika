import { CcloudServiceAccount } from "./connected/CcloudServiceAccount";
import { CcloudApiKeys } from "./connected/CcloudApiKeys";
import { CcloudCluster } from "./connected/CcloudCluster";
import { CcloudKafKa } from "./connected/CcloudKafKa";

export default class Ccloud implements CCloudCliWrapper {
  binPath: string;

  ServiceAccounts: CcloudServiceAccount;
  ApiKeys: CcloudApiKeys;
  Topic: CcloudTopic;
  Cluster: CcloudCluster;
  Kafka: Kafka;

  constructor() {
    this.ServiceAccounts = new CcloudServiceAccount(this);
    this.ApiKeys = new CcloudApiKeys(this);
    this.Cluster = new CcloudCluster(this);
    this.Kafka = new CcloudKafKa();
  }

  login() {
    const cli = process.env.TIKA_CCLOUD_BIN_PATH;
    let ccUser = process.env.TIKA_CC_USER;
    let ccPass = process.env.TIKA_CC_PASS;
  }
}

class CcloudTopic {
  ccloud: Ccloud;

  list(): string[] {
    return [];
  }

  constructor(ccloud: Ccloud) {
    this.ccloud = ccloud;
  }
}

export { Ccloud };
