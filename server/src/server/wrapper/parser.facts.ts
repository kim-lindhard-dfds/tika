import {parseSideColumns, parse, parseTopicDescription} from "./parser";


test("parse describe topic",async () => {
  let data : string[] = [];
  data.push("Topic: devx-acltest2 PartitionCount: 12 ReplicationFactor: 3");
  data.push("      Topic     | Partition | Leader | Replicas |   ISR    ");
  data.push("+---------------+-----------+--------+----------+---------+");
  data.push("  devx-acltest2 |         0 |      0 | [0 5 1]  | [5 1 0]  ");
  data.push("  devx-acltest2 |         1 |      1 | [1 0 2]  | [2 1 0]  ");
  data.push("  devx-acltest2 |         2 |      2 | [2 1 3]  | [3 2 1]  ");
  data.push("  devx-acltest2 |         3 |      3 | [3 2 4]  | [4 3 2]  ");
  data.push("  devx-acltest2 |         4 |      4 | [4 3 5]  | [5 4 3]  ");
  data.push("  devx-acltest2 |         5 |      5 | [5 4 0]  | [5 4 0]  ");
  data.push("  devx-acltest2 |         6 |      0 | [0 4 5]  | [5 4 0]  ");
  data.push("  devx-acltest2 |         7 |      1 | [1 5 0]  | [5 1 0]  ");
  data.push("  devx-acltest2 |         8 |      2 | [2 0 1]  | [2 1 0]  ");
  data.push("  devx-acltest2 |         9 |      3 | [3 1 2]  | [3 2 1]  ");
  data.push("  devx-acltest2 |        10 |      4 | [4 2 3]  | [4 3 2]  ");
  data.push("  devx-acltest2 |        11 |      5 | [5 3 4]  | [5 4 3]  ");
  data.push("");
  data.push("Configuration");
  data.push(" ");
  data.push("                   Name                   |        Value         ");
  data.push("+-----------------------------------------+---------------------+");
  data.push("  compression.type                        | producer             ");
  data.push("  leader.replication.throttled.replicas   |                      ");
  data.push("  message.downconversion.enable           | true                 ");
  data.push("  min.insync.replicas                     |                   2  ");
  data.push("  segment.jitter.ms                       |                   0  ");
  data.push("  cleanup.policy                          | delete               ");
  data.push("  flush.ms                                | 9223372036854775807  ");
  data.push("  follower.replication.throttled.replicas |                      ");
  data.push("  retention.ms                            |            46400000  ");
  data.push("  segment.bytes                           |          1073741824  ");
  data.push("  flush.messages                          | 9223372036854775807  ");
  data.push("  message.format.version                  | 2.3-IV1              ");
  data.push("  file.delete.delay.ms                    |               60000  ");
  data.push("  max.compaction.lag.ms                   | 9223372036854775807  ");
  data.push("  max.message.bytes                       |             2097164  ");
  data.push("  min.compaction.lag.ms                   |                   0  ");
  data.push("  message.timestamp.type                  | CreateTime           ");
  data.push("  preallocate                             | false                ");
  data.push("  min.cleanable.dirty.ratio               |                 0.5  ");
  data.push("  index.interval.bytes                    |                4096  ");
  data.push("  unclean.leader.election.enable          | false                ");
  data.push("  retention.bytes                         |                  -1  ");
  data.push("  delete.retention.ms                     |            86400000  ");
  data.push("  segment.ms                              |           604800000  ");
  data.push("  message.timestamp.difference.max.ms     | 9223372036854775807  ");
  data.push("  segment.index.bytes                     |            10485760  ");
  let topic = parseTopicDescription(data);

  expect(topic.Name).toEqual("devx-acltest2");
  expect(topic.PartitionCount).toEqual(12);

  expect(topic.Configurations["cleanup.policy"]).toEqual("delete");
  expect(topic.Configurations["message.downconversion.enable"]).toEqual(true);
  expect(topic.Configurations["message.timestamp.difference.max.ms"]).toEqual(9223372036854775807);
  expect(topic.Configurations["min.cleanable.dirty.ratio"]).toEqual(0.5);
  
});

test("basic",async () => {
    let data : string[] = [];
    data.push("+-------------+--------------------------------+");
    data.push("| Id          |                          31977 |")
    data.push("| Name        | tika-test-03                   |")
    data.push("| Description | Oh noooooooooooooo adad        |")
    data.push("|             | adawryy 8asr 7dsf87ahyd 7a8sdy |")
    data.push("|             | 78aw7e3n                       |")
    data.push("+-------------+--------------------------------+")

    let resp = parseSideColumns(data);
    expect(resp).toStrictEqual(
      {
        "Description": "Oh noooooooooooooo adadadawryy 8asr 7dsf87ahyd 7a8sdy78aw7e3n", 
        "Id": "31977", 
        "Name": 
        "tika-test-03"
      }
    );
  });

  test("parse api-key create",async () => {
    let data : string[] = [];
    data.push("Save the API key and secret. The secret is not retrievable later.");
    data.push("+---------+------------------------------------------------------------------+");
    data.push("| API Key | QAAAQRZE324JUWUT                                                 |");
    data.push("| Secret  | xlUWLYolo2oyFITLTLene/H5nnotakeyWPw8TZgaW4y/PRngeXndmE/He1J0uce6 |");
    data.push("+---------+------------------------------------------------------------------+");
    

    let resp = parseSideColumns(data);
    expect(resp).toStrictEqual(
      {
        "APIKey": "QAAAQRZE324JUWUT", 
        "Secret": "xlUWLYolo2oyFITLTLene/H5nnotakeyWPw8TZgaW4y/PRngeXndmE/He1J0uce6"
      }
    );
  });


test("parse api-key list",async () => {
  let data : string[] = [];
  data.push("         Key         | Owner |          Description           | Resource Type | Resource ID  ");
  data.push("+--------------------+-------+--------------------------------+---------------+-------------+");
  data.push("    Z73ETVHCXX6KEM55 |  6181 |                                | kafka         | ldc-8npi5    ");
  data.push("    DVBTGI7B2EXGNBYS |  6482 |                                | kafka         | ldc-8npi5    ");
  data.push("    AY7YDEDAZBAABRJP |  7547 | DFDS Devx Selfservice portal   | kafka         | ldc-8npi5    ");
  data.push("    HVK2NXJVIBVLA4PU |  9167 | DevEx Kafka metrics collection | kafka         | ldc-8npi5    ");
  data.push("                     |       | and storage                    |               |              ");
  data.push("    HRSINVYNJUF5O2KF |  9328 |                                | kafka         | ldc-8npi5    ");
  data.push("    HEGITBC2KIDDE24G | 21958 | for testing, delete safely at  | kafka         | ldc-8npi5    ");
  data.push("                     |       | any time                       |               |              ");
  data.push("    PDRQ4ENT5HFAOY3Q | 23150 | Capability: Seabeast           | kafka         | ldc-8npi5    ");
  data.push("                     |       | production                     |               |              ");
  data.push("    FZYI6C2IWMBD7HBX | 20744 |                                | kafka         | ldc-8npi5    ");
  data.push("    7MUFO4H6N5UAKLW2 | 20744 | delete me                      | kafka         | ldc-8npi5    ");

  let resp = parse(data);
  expect(resp).toStrictEqual(
    [{"Description": "", "Key": "Z73ETVHCXX6KEM55", "Owner": "6181", "ResourceID": "ldc-8npi5", "ResourceType": "kafka"}, {"Description": "", "Key": "DVBTGI7B2EXGNBYS", "Owner": "6482", "ResourceID": "ldc-8npi5", "ResourceType": "kafka"}, {"Description": "DFDS Devx Selfservice portal", "Key": "AY7YDEDAZBAABRJP", "Owner": "7547", "ResourceID": "ldc-8npi5", "ResourceType": "kafka"}, {"Description": "DevEx Kafka metrics collection and storage", "Key": "HVK2NXJVIBVLA4PU", "Owner": "9167", "ResourceID": "ldc-8npi5", "ResourceType": "kafka"}, {"Description": "", "Key": "HRSINVYNJUF5O2KF", "Owner": "9328", "ResourceID": "ldc-8npi5", "ResourceType": "kafka"}, {"Description": "for testing, delete safely at any time", "Key": "HEGITBC2KIDDE24G", "Owner": "21958", "ResourceID": "ldc-8npi5", "ResourceType": "kafka"}, {"Description": "Capability: Seabeast production", "Key": "PDRQ4ENT5HFAOY3Q", "Owner": "23150", "ResourceID": "ldc-8npi5", "ResourceType": "kafka"}, {"Description": "", "Key": "FZYI6C2IWMBD7HBX", "Owner": "20744", "ResourceID": "ldc-8npi5", "ResourceType": "kafka"}, {"Description": "delete me", "Key": "7MUFO4H6N5UAKLW2", "Owner": "20744", "ResourceID": "ldc-8npi5", "ResourceType": "kafka"}]
  );
  });

  