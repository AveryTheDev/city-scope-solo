export const refineName = async name => {
  if (typeof name !== "string") {
    name = Object.values(name).toString();
  }

  let cityName = name.charAt(0).toUpperCase() + name.slice(1);
  cityName = name
    .split("-")
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");

    if (cityName === "Minneapolis-saint Paul") {
    cityName = "Minneapolis-Saint Paul";
    return cityName;
    }

  if (
    cityName === "Washington, D.c." ||
    cityName === "Washington D.c." ||
    cityName === "Washington Dc" ||
    cityName === "Washington, D.c."
  ) {
    cityName = "Washington, D.C.";
    return cityName;
  }

  return cityName;
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
