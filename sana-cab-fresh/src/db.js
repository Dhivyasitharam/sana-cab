const DB_NAME = "SANA_CAB_DB_V3";
const DB_VERSION = 1;
let db = null;

export function openDB() {
  return new Promise((resolve, reject) => {
    if (db) return resolve(db);
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const d = e.target.result;
      ["registrations","bookings","reviews"].forEach(store => {
        if (!d.objectStoreNames.contains(store))
          d.createObjectStore(store, { keyPath:"id", autoIncrement:true });
      });
    };
    req.onsuccess = (e) => { db = e.target.result; resolve(db); };
    req.onerror = reject;
  });
}
export async function dbGetAll(store) {
  const d = await openDB();
  return new Promise((res, rej) => {
    const tx = d.transaction(store, "readonly");
    const req = tx.objectStore(store).getAll();
    req.onsuccess = () => res(req.result);
    req.onerror = rej;
  });
}
export async function dbAdd(store, data) {
  const d = await openDB();
  return new Promise((res, rej) => {
    const tx = d.transaction(store, "readwrite");
    const req = tx.objectStore(store).add(data);
    req.onsuccess = () => res(req.result);
    req.onerror = rej;
  });
}
export async function dbUpdate(store, data) {
  const d = await openDB();
  return new Promise((res, rej) => {
    const tx = d.transaction(store, "readwrite");
    const req = tx.objectStore(store).put(data);
    req.onsuccess = () => res(req.result);
    req.onerror = rej;
  });
}
export async function dbDelete(store, id) {
  const d = await openDB();
  return new Promise((res, rej) => {
    const tx = d.transaction(store, "readwrite");
    const req = tx.objectStore(store).delete(id);
    req.onsuccess = res;
    req.onerror = rej;
  });
}
