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

    console.log(payload);
    return payload;
  } else {
    throw new Error("Invalid input given to parser");
  }
}

export { parse };
