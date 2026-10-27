export interface LocalDocumentRecord {
  id: string;
  name: string;
  type: string;
  size: number;
  createdAt: string;
  blob: Blob;
}

export interface LocalDocumentMetadata {
  id: string;
  name: string;
  type: string;
  size: number;
  createdAt: string;
}

const DB_NAME = 'counselflow-local-documents';
const STORE_NAME = 'documents';
const DB_VERSION = 1;

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('Could not open local document storage.'));
  });
}

function requestToPromise<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('Local storage request failed.'));
  });
}

export async function saveLocalDocument(file: File): Promise<LocalDocumentMetadata> {
  const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
  if (!isPdf) throw new Error('Please choose a PDF file.');

  const id = `local-${typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`}`;
  const record: LocalDocumentRecord = {
    id,
    name: file.name,
    type: file.type || 'application/pdf',
    size: file.size,
    createdAt: new Date().toISOString(),
    blob: file,
  };

  const db = await openDatabase();
  try {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    await requestToPromise(tx.objectStore(STORE_NAME).put(record));
  } finally {
    db.close();
  }

  const { blob: _blob, ...metadata } = record;
  return metadata;
}

export async function listLocalDocuments(): Promise<LocalDocumentMetadata[]> {
  const db = await openDatabase();
  try {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const records = await requestToPromise(tx.objectStore(STORE_NAME).getAll()) as LocalDocumentRecord[];
    return records
      .map(({ blob: _blob, ...metadata }) => metadata)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } finally {
    db.close();
  }
}

export async function getLocalDocument(id: string): Promise<LocalDocumentRecord | null> {
  const db = await openDatabase();
  try {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const record = await requestToPromise(tx.objectStore(STORE_NAME).get(id)) as LocalDocumentRecord | undefined;
    return record ?? null;
  } finally {
    db.close();
  }
}

export async function deleteLocalDocument(id: string): Promise<void> {
  const db = await openDatabase();
  try {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    await requestToPromise(tx.objectStore(STORE_NAME).delete(id));
  } finally {
    db.close();
  }
}
