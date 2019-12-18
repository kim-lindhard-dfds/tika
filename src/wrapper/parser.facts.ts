import {parseSideColumns, parse} from "./parser";

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