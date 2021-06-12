
  // Access the icon png depending on the iconId parameter inside the location object
export default function renderIcon (iconId) {
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
