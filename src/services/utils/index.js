export const refineName = async name => {
  if (typeof name !== "string") {
    name = Object.values(name).toString();
  }

  let refinedName = name.charAt(0).toUpperCase() + name.slice(1);
  refinedName = name
    .split("-")
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");

    if (refinedName === "Minneapolis-saint Paul") {
    refinedName = "Minneapolis-Saint Paul";
    return refinedName;
    }

  if (
    refinedName === "Washington, D.c." ||
    refinedName === "Washington D.c." ||
    refinedName === "Washington Dc" ||
    refinedName === "Washington, D.c."
  ) {
    refinedName = "Washington, D.C.";
    return refinedName;
  }

  return refinedName;
};

export const statFormat = async numberValue => {
        let x = numberValue;

        const numberWithCommas = (x) => {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        if (!x) return 0;
        else {
          x = numberWithCommas(x);  
          return x;
        } 
    }
