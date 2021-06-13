import db from "../fakedb";
import { getDistance, getBoundsOfDistance } from "geolib";
const regionToLoad = 3000; //max distance from the current region to load icons from

import dbh from "./databaseConnection";

export function getBounds (region) {
  // console.log("in getbounds, the region is", region)
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
  const coordinates = dbh.collection("coordinates");
  const bounds = getBounds(region)
  const query = await coordinates
    .where("latitude", ">=", bounds.minLat)
    .where("latitude", "<=", bounds.maxLat)
    .get();
  const coordsArray = [];
  query.docs.forEach((doc) => {
    // console.log("doc data", doc.data())
    coordsArray.push(doc.data());
  });
  return coordsArray;
}

export async function postNewCoord (coord) {
  // console.log("in async posting", coord)
  const res = await dbh.collection("coordinates").add(coord)
  // console.log('Added document with ID:', res.id);
}