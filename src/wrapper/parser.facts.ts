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
    console.log(resp);
    expect(resp).toStrictEqual(
      {
        "Description": "Oh noooooooooooooo adadadawryy 8asr 7dsf87ahyd 7a8sdy78aw7e3n", 
        "Id": "31977", 
        "Name": 
        "tika-test-03"
      }
    );
  });