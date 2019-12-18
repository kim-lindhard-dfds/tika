type ParseInput = string[];
function countSpacesFromBack(input: string) : number {
  let spaceCount : number = 0;
  for (let currentPosition = input.length-1; currentPosition > 0; currentPosition--) {
    let currentCharCode = input.charCodeAt(currentPosition);
    if (currentCharCode === 32) {
      spaceCount++;
    } else {
      break;
    }
  }

  return spaceCount;
}

function parse(input: ParseInput): any[] {
  if (input.length > 0) {
    let columns = input[0].replace(/\s/g, "").split("|");
    let payload: any[] = [];

    for (var i = 2; i < input.length; i++) {
      // let rawEntry: string[] = input[i].replace(/\s/g, "").split("|");
      let rawEntry: string[] = input[i].split("|");
      

      let entry: any = {};
      columns.forEach((column, index) => {
        let val = "";
        if (column.valueOf() !== "Description") {
          val = rawEntry[index].replace(/\s/g, "");
        } else {
          val = rawEntry[index].trimLeft();
          let spaceCounted = countSpacesFromBack(val);
          val = val.slice(0, val.length - spaceCounted);
        }

        entry[column] = val;
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

        let spacesCounted = countSpacesFromBack(columnValue);
        columnValue = columnValue.slice(0, columnValue.length - spacesCounted);

        payload["Description"] = previousEntry + columnValue;
        continue;
      }

      if (rawEntry[1].replace(/\s/g, "").valueOf() !== "Description") {
        columnValue = columnValue.replace(/\s/g, "");
      } else {
        columnValue = columnValue.trimLeft();

        let spaceCounted = countSpacesFromBack(columnValue);
        columnValue = columnValue.slice(0, columnValue.length - spaceCounted);
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
