import db from '../fakedb';
import { getDistance } from 'geolib';
const regionToLoad = 3000;
const maxZoom = 0.022;



export async function getCoords (region) {
  console.log("region in service", region)
  // const calculateDistance;
  // console.log(db);
  // const debe = db.filter(item => )
  if (region.latitudeDelta > maxZoom) return [];
  return db.filter(item => {
    const dis = getDistance(
      { latitude: item.latitude, longitude: item.longitude },
      { latitude: region.latitude, longitude: region.longitude }
    );
    console.log("dis", dis);
    return dis <= regionToLoad;
  })
}