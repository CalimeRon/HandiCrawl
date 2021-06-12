import db from '../fakedb';
import { getDistance, getBoundsOfDistance } from 'geolib';
const regionToLoad = 3000;  //max distance from the current region to load icons from
const maxZoom = 0.022;
import dbh from './databaseConnection'
import { SnapshotViewIOS } from 'react-native';

export function getBounds (region) {
  const bounds = getBoundsOfDistance(
    { latitude: region.latitude, longitude: region.longitude },
    regionToLoad
  )
  const formattedBounds = {
    minLat: bounds[0].latitude,
    minLong: bounds[0].longitude,
    maxLat: bounds[1].latitude,
    maxLong: bounds[1].longitude
  }
  return formattedBounds;
}

export async function getCoords (region) {
  if (!region) return;
  const coordinates = dbh.collection('coordinates');
  const snapShot = await coordinates.get();
  snapShot.forEach(doc => {
    console.log(doc.id, '=>', donc.data());
  })
  // console.log(getBoundsOfDistance(
  //   { latitude: region.latitude, longitude: region.longitude },
  //   regionToLoad
  // ))
  console.log("fetching called")
  const boundToSend = getBounds(region)

  console.log("to send", boundToSend);

  if (region.latitudeDelta > maxZoom) return [];
  return db.filter(item => {
    const dis = getDistance(
      { latitude: item.latitude, longitude: item.longitude },
      { latitude: region.latitude, longitude: region.longitude }
    );
    // console.log("dis", dis);
    return dis <= regionToLoad;
    // when backend is set-up, the actual filtering of icons to render will happen on the fetch via a query
  })
}