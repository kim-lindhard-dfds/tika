type ParseInput = string[];

function parse(input: ParseInput): any[] {
  if (input.length > 0) {
    let columns = input[0].replace(/\s/g, "").split("|");
    let payload: any[] = [];

    for (var i = 2; i < input.length; i++) {
      let rawEntry: string[] = input[i].replace(/\s/g, "").split("|");
      let entry: any = {};
      columns.forEach((column, index) => {
        entry[column] = rawEntry[index];
      });

      if ((entry.Id as string).length === 0) {
        let previousEntry: any = payload.slice(-1)[0];
        previousEntry.Description =
          previousEntry.Description + " " + entry.Description;
      } else {
        payload.push(entry);
      }
    }

    return payload;
  } else {
    throw new Error("Invalid input given to parser");
  }
}

function parseSideColumns(input: ParseInput): any[] {
  if (input.length > 0) {
    let payload: any = {};

    for (var i = 0; i < input.length; i++) {
      if (input[i].includes("+-")) {
        continue;
      }

      let rawEntry: string[] = input[i].split("|");
      let columnName : string = rawEntry[1].replace(/\s/g, "");
      let columnValue : string = rawEntry[2];

      if (columnName.valueOf() === "".valueOf()) {
        let previousEntry: any = payload["Description"];
        columnValue = columnValue.trimLeft();

        let spaceCounter : number = 0;
        for (let j = columnValue.length-1; j > 0; j--) {
          let currentCharCode = columnValue.charCodeAt(j);
          if (currentCharCode === 32) {
            spaceCounter++;
          } else {
            break;
          }
        }
        columnValue = columnValue.slice(0, columnValue.length - spaceCounter);

        payload["Description"] = previousEntry + columnValue;
        continue;
      }

      if (rawEntry[1].replace(/\s/g, "").valueOf() !== "Description") {
        columnValue = columnValue.replace(/\s/g, "");
      } else {
        columnValue = columnValue.trimLeft();

        let spaceCounter : number = 0;
        for (let j = columnValue.length-1; j > 0; j--) {
          let currentCharCode = columnValue.charCodeAt(j);
          if (currentCharCode === 32) {
            spaceCounter++;
          } else {
            break;
          }
        }
        columnValue = columnValue.slice(0, columnValue.length - spaceCounter);
      }

      //console.log(i, rawEntry);
      payload[columnName] = columnValue;
    }

    return payload;
  } else {
    throw new Error("Invalid input given to parser");
  }
}

export { parse, parseSideColumns };
