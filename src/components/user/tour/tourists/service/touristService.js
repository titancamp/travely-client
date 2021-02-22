const KEYS = {
  tourists: "tourists",
  touristId: "touristId"

};

export const getAgencyCollection = () => (
  [
    { id: "1", title: "Agency1" },
    { id: "2", title: "Agency2" },
    { id: "3", title: "Agency3" },
    { id: "4", title: "Agency4" }
  ]

);

export function insertTourist(data) {
  let tourists = getAllTourists();
  data["id"] = generateTouristId();
  tourists.push(data);
  localStorage.setItem(KEYS.tourists, JSON.stringify(tourists));
}

export function updateTourist(data) {
  let tourists = getAllTourists();
  let recordIndex = tourists.findIndex(x => x.id === data.id);
  tourists[recordIndex] = { ...data };
  localStorage.setItem(KEYS.tourists, JSON.stringify(tourists));
}

export function deleteTourist(id) {
  let tourists = getAllTourists();
  tourists = tourists.filter(x => x.id !== id);
  localStorage.setItem(KEYS.tourists, JSON.stringify(tourists));
}

export function generateTouristId() {

  if (localStorage.getItem(KEYS.touristId) == null)
    localStorage.setItem(KEYS.touristId, "0");

  let id = parseInt(localStorage.getItem(KEYS.touristId));
  localStorage.setItem(KEYS.touristId, (++id).toString());
  return id;
}

export function getAllTourists() {
  if (localStorage.getItem(KEYS.tourists) == null)
    localStorage.setItem(KEYS.tourists, JSON.stringify([]));

  let tourists = JSON.parse(localStorage.getItem(KEYS.tourists));

  let agencies = getAgencyCollection();

  return tourists.map(x => ({
    ...x,
    agency: agencies[x.agencyId - 1] && agencies[x.agencyId - 1].title
  }));
}