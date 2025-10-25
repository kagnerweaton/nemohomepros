import { regions } from '../data/regions';

interface Point {
  lat: number;
  lon: number;
}

const regionCenters = regions.map(r => ({
  id: r.id,
  name: r.name,
  location: r.location,
}));

/**
 * Calculates the distance between two points on Earth using the Haversine formula.
 * @param p1 - The first point (latitude, longitude).
 * @param p2 - The second point (latitude, longitude).
 * @returns The distance in kilometers.
 */
function calculateDistance(p1: Point, p2: Point): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = ((p2.lat - p1.lat) * Math.PI) / 180;
  const dLon = ((p2.lon - p1.lon) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((p1.lat * Math.PI) / 180) *
      Math.cos((p2.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Finds the closest service region to a given set of coordinates.
 * @param contractorLocation - The latitude and longitude of the contractor.
 * @returns The region object of the closest service area.
 */
export function assignRegionByCoordinates(contractorLocation: Point) {
  let closestRegion = regionCenters[0];
  let minDistance = Infinity;

  for (const region of regionCenters) {
    const distance = calculateDistance(contractorLocation, region.location);
    if (distance < minDistance) {
      minDistance = distance;
      closestRegion = region;
    }
  }

  return closestRegion;
}

/**
 * Example Usage:
 *
 * const contractorCoords = { lat: 39.41, lon: -92.43 }; // Example coordinates for Moberly, MO
 * const assignedRegion = assignRegionByCoordinates(contractorCoords);
 * console.log(assignedRegion.name); // Outputs: "Moberly"
 *
 * const anotherContractor = { lat: 39.79, lon: -93.52 }; // Example for Chillicothe, MO
 * const anotherRegion = assignRegionByCoordinates(anotherContractor);
 * console.log(anotherRegion.name); // Outputs: "Chillicothe"
 */
