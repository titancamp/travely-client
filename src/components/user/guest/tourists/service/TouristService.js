import TouristClient from "../../../../../api/tourist-client";

export function getAllTourists() {
  return TouristClient.getAllTourists();
}

export function insertTourist(data) {
  return TouristClient.insertTourist(data);
}

export function updateTourist(data) {
  return TouristClient.updateTourist(data);
}

export function deleteTourist(id) {
  return TouristClient.deleteTourist(id);
}
