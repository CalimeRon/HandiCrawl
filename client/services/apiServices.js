import db from '../fakedb';
import { getDistance } from 'geolib';
const regionToLoad = 3000;  //max distance from the current region to load icons from
const maxZoom = 0.022;



export async function getCoords (region) {
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