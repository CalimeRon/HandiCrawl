export const allIcons = [
  "warning",
  "easyAccess",
  "elevator",
  "ramp",
  "stairs",
  'parking',
]

  // Access the icon png depending on the iconId parameter inside the location object
export function renderIcon (iconId) {
  // console.log('in renderIcon, iconid=', iconId)
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
    case "parking":
      return require('../assets/parkingSpot.png')
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
      return "Ramp";
    case "stairs":
      return "Stairs";
    case "parking":
      return "Parking spot";
    default:
      return null;
  }
}

export function renderDescr(string) {
  switch (string) {
    case "warning":
      return "Put this marker to describe a tricky path (bad road, bumps...)";
    case "easyAccess":
      return "Put this marker for relatively easy paths (flat paths, no bareer...)";
    case "elevator":
      return "Put this marker if there is an device that allows you to move up and down thanks to elelectricity.a.k.a.an elevator"
    case "ramp":
      return "Put this marker if there is an actual dedicated ramp in the location";
    case "stairs":
      return "Put this icon if there are stairs. You can precise in the description how steep they are";
    case "parking":
      return "Put this icon where you find a dedicated parking spot";
    default:
      return null;
  }
}
