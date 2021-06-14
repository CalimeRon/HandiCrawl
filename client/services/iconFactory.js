
  // Access the icon png depending on the iconId parameter inside the location object
export function renderIcon (iconId) {
  console.log('in renderIcon, iconid=', iconId)
  switch (iconId) {
    case "warning":
      return require("../assets/warning.png");
    case "easyAccess":
      return require("../assets/easyAccess.png");
    case "elevator":
      return require("../assets/elevator.png");
    case "ramp":
      return require("../assets/ramp.png");
    case "stairs":
      return require("../assets/stairs.png");
    default:
      return require("../assets/smilou.png");
  }
}


export function renderTitle(string) {
  switch (string) {
    case "warning":
      return "Warning";
    case "easyAccess":
      return "Easy access";
    case "elevator":
      return "Elevator";
    case "ramp":
      return "Dedicated ramp";
    case "stairs":
      return "Stairs";
    default:
      return null;
  }
}