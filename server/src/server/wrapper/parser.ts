type ParseInput = string[];


function parse(rows: ParseInput): any[] {
  if (rows.length < 1) {
    throw new Error("Invalid input given to parser");
  }

  let headerColumns = rows[0].replace(/\s/g, "").split("|");
  let descriptionIndex = headerColumns.findIndex(c => c.valueOf() === "Description");



  let processedRows: string[][] = new Array();
  rows.shift();
  rows.shift();

  for (var currentRow = 0; currentRow < rows.length; currentRow++) {
    let currentRawColumns: string[] = rows[currentRow].split("|");

    let processedRow: string[] = [];
    for (var currentColumnIndex = 0; currentColumnIndex < currentRawColumns.length; currentColumnIndex++) {
      let scrubbedColumn = currentRawColumns[currentColumnIndex].trimLeft().trimRight();
      
      if (currentColumnIndex !== descriptionIndex) {
        processedRow[currentColumnIndex] = scrubbedColumn;
        continue;
      }

      let notDescriptionColumnsValues = currentRawColumns
        .filter((value, index) => index !== descriptionIndex)
        .join("")
        .replace(/\s/g, "");

      if (notDescriptionColumnsValues.length === 0) {
        processedRows[processedRows.length - 1][currentColumnIndex] = processedRows[processedRows.length - 1][currentColumnIndex] + " " + scrubbedColumn;
        processedRow = null;
        break;
      }

      processedRow[currentColumnIndex] = scrubbedColumn;
    }

    if (processedRow === null) {
      continue;
    }
    processedRows.push(processedRow);

  }

  let result: any[] = [];

  processedRows.forEach(row => {
    let entry: any = {};
    for (var currentColumnId = 0; currentColumnId < row.length; currentColumnId++) {
      entry[headerColumns[currentColumnId]] = row[currentColumnId];
    }
    result.push(entry);
  });
  return result;

}
function countSpacesFromBack(input: string): number {
  let spaceCount: number = 0;
  for (let currentPosition = input.length - 1; currentPosition > 0; currentPosition--) {
    let currentCharCode = input.charCodeAt(currentPosition);
    if (currentCharCode === 32) {
      spaceCount++;
    } else {
      break;
    }
  }

  return spaceCount;
}

function parseSideColumns(input: ParseInput): any[] {
  if (input.length > 0) {
    let payload: any = {};

    for (var i = 0; i < input.length; i++) {
      if (input[i][0] !== "|") {
        continue;
      }

      let rawEntry: string[] = input[i].split("|");
      let columnName: string = rawEntry[1].replace(/\s/g, "");
      let columnValue: string = rawEntry[2];

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
