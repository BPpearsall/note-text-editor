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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const editDB = await openDB('edit', 1)
  const tx = editDB.transaction('edit', 'readwrite')
  const store = tx.objectStore('edit')
  const request = store.put({ id: 1, value: content })
  const result = await request
  console.error('putDb not implemented', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const editDB = await openDB('edit', 1)
  const tx = editDB.transaction('edit', 'readonly');
  const store = tx.objectStore('edit');
  const request = store.get(1);
  const result = await request;
  console.log('result.value', result);
  return result?.value;
}

initdb();
