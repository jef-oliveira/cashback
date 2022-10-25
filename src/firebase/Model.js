import Firebase from './';
import { onSnapshot, query, getDoc, addDoc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';


export default class Model {
  constructor(doc) {
    this.__doc = doc?.exists && doc;
    this.__fromCache = doc?.metadata?.fromCache;
    this.__hasPendingWrites = doc?.metadata?.hasPendingWrites;
    this.id = doc?.id;

    this.__setProps(doc?.data?.() || doc, this);
  }

  static fromDoc(doc) {
    if (doc?.exists)
      return new this(doc);
  }

  static fromDocsList(docs = []) {
    return docs.map(doc => this.fromDoc(doc));
  }

  static collection() {
    return Firebase.collection(this.collectionPath());
  }

  static doc(id) {
    return Firebase.doc(this.collectionPath(), id);
  }

  static backupCollection(backupName) {
    return Firebase.collection(this.collectionPath() + '_' + backupName);
  }

  static async find(id) {
    const docRef = this.doc(id);
    const doc = await getDoc(docRef);

    if (doc.exists())
      return this.fromDoc(doc);
  }

  static where(...args) {
    return this.collection().where(...args);
  }

  static onSnapshot(callback) {
    return onSnapshot(query(this.collection()), callback);
  }

  __setProps(data, target) {
    if (Array.isArray(data))
      data.forEach((childData, index) => {
        this.__setValueToTargetKey(childData, target, index);
      });

    if (typeof data == 'object')
      for (const [propKey, propValue] of Object.entries(data)) {
        this.__setValueToTargetKey(propValue, target, propKey);
      }
  }

  __setValueToTargetKey(value, target, key) {
    if (value?.toDate) {
      target[key] = value.toDate();
    } else if (Array.isArray(value)) {
      target[key] = [];
      this.__setProps(value, target[key]);
    } else if (typeof value == 'object') {
      target[key] = {};
      this.__setProps(value, target[key]);
    } else {
      target[key] = value;
    }
  }

  __toData() {
    const data = {};
    for (const [propKey, propValue] of Object.entries(this)) {
      if (typeof propValue !== 'function' && !propKey.startsWith('__') && propKey !== 'id')
        data[propKey] = propValue;
    }
    return data;
  }

  __trackingData(action) {
    const data = {};
    data[`${action}dAt`] = new Date();
    data[`${action}dBy`] = Firebase.auth()?.currentUser?.uid;
  }

  async save() {
    if (this.__doc) {
      this.__setProps(this.__trackingData('update'), this);
      await updateDoc(this.__doc.ref, this.__toData());
      return this;
    } else {
      this.__setProps(this.__trackingData('create'), this);
      if (this.id) {
        await setDoc(this.constructor.doc(this.id), this.__toData());
        return this.constructor.find(this.id);
      } else {
        const newDocRef = await addDoc(this.constructor.collection(), this.__toData());
        const newDoc = await getDoc(newDocRef);
        return this.constructor.fromDoc(newDoc);
      }
    }
  }

  async delete() {
    if (this.__doc) {
      this.__setProps(this.__trackingData('delete'), this);
      const backup = await this.__createBackup('deleted', this.__toData(), this.id);
      await deleteDoc(this.__doc.ref);
      return backup;
    }
  }

  async __createBackup(backupName, data, id) {
    this.__setProps(this.__trackingData('create'), this);
    const backupDocRef = await addDoc(this.constructor.backupCollection(backupName), data);
    const backupDoc = await getDoc(backupDocRef);
    return this.constructor.fromDoc(backupDoc);
  }
};