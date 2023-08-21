import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.error('putDb not implemented');
  // connect to db
  const contactDb = await openDB('jate', 1);
  // new transaction specifying db and privlieges
  const tx = contactDb.transaction('jate', 'readwrite');
  // opens desired object store
  const store = tx.objectStore('jate');
  // use .add method to pass in content
  const request = store.put({ id: 1, value: content });
  // request confirmation
  const result = await request;
  console.log('Data daved to DB', result);
};

// Method that gets all the content from the database
export const getDb = async () => {
  console.error('getDb not implemented');
  const contactDb = await openDB('jate', 1);
  const tx = contactDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  // use getall to get all data from the db
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

initdb();