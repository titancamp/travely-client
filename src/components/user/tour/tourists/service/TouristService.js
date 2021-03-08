import touristsMockData from "./utils/TouristServiceMockData";

let tourists = touristsMockData;

export function getAllTourists() {

  if (tourists.length == null)
    tourists = [];

  return tourists;
}

export function insertTourist(data) {
  data["id"] = generateTouristId();
  tourists.push(data);
}

export function updateTourist(data) {

  let recordIndex = tourists.findIndex(x => x.id === data.id);
  tourists[recordIndex] = { ...data };
}

export function deleteTourist(id) {

  tourists = tourists.filter(x => x.id !== id);

}

export function generateTouristId() {

  if (tourists.id == null)
    tourists.id = 0;

  let id = Math.max(...tourists.map(tourist => tourist.id));

  return ++id;
}

