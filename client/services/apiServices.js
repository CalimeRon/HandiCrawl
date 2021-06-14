import db from "../fakedb";
import { getDistance, getBoundsOfDistance } from "geolib";
const regionToLoad = 3000; //max distance from the current region to load icons from

import dbh from "./databaseConnection";

//When called, sets the bounds of the area in which to load the icons
export function getBounds(region) {
  const bounds = getBoundsOfDistance(
    { latitude: region.latitude, longitude: region.longitude },
    regionToLoad
  );
  const formattedBounds = {
    minLat: bounds[0].latitude,
    minLong: bounds[0].longitude,
    maxLat: bounds[1].latitude,
    maxLong: bounds[1].longitude,
  };
  return formattedBounds;
}

export async function getCoords(region) {
  // console.log(" entered getcoords, fetching not initiated", region);
  if (!region) return;

  console.log("fetching initiated", region);
  
  // const coordinates = dbh.collection("coordinates");
  // const bounds = getBounds(region)
  // const query = await coordinates
  //   .where("latitude", ">=", bounds.minLat)
  //   .where("latitude", "<=", bounds.maxLat)
  //   .get();
  // const coordsArray = [];
  // query.docs.forEach((doc) => {
  //   // console.log("doc data", doc.data())
  //   coordsArray.push(doc.data());
  // });
  // return coordsArray;

 // I keep this below to test without wasting requests to Firestore (since there's a quota)
  return [
    {
      _id: "60c3234d36ac69e8941637b0",
      placeName: "Dans ton gros cul pourri",
      icon: "ramp",
      latitude: 44.43750100149944,
      longitude: 26.09280906994737,
      description: "entrance by the East Side - ramp available",
      score: 0,
    },
    {
      _id: "60c3234d226e1bda5b481c83",
      placeName: "Ion Campineanu 29 bloc 6 Sc.1",
      icon: "warning",
      latitude: 44.438269898955824,
      longitude: 26.094277233533187,
      description: "floor not flat for wheelchairs",
      score: 0,
    },
  ];
}

export async function postNewCoord(coord) {
  // console.log("in async posting", coord)
  const res = await dbh.collection("coordinates").add(coord);
  console.log("after posting I get this", res);
  // console.log('Added document with ID:', res.id);
}
