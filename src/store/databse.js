import { defineStore } from "pinia";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import { db, auth } from "../../firebaseConfig";
import { nanoid } from "nanoid";

export const useDatabaseStore = defineStore("database", {
  state: () => ({
    documents: [],
    loading: false,
    loadingDoc: false,
  }),

  actions: {
    async getUrls() {
      this.loadingDoc = true;
      try {
        const q = query(
          collection(db, "urls"),
          where("user", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((_doc) => {
          this.documents.push({
            id: _doc.id,
            ..._doc.data(),
          });
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },

    async addUrl(name) {
      try {
        const objDoc = {
          name: name,
          short: nanoid(6),
          user: auth.currentUser.uid,
        };

        const docRef = await addDoc(collection(db, "urls"), objDoc);
        this.documents.push({
          ...objDoc,
          id: docRef.id,
        });
      } catch (error) {
        console.log(error);
      }
    },

    async deleteUrl(id) {
      try {
        const docRef = doc(db, "urls", id);
        await deleteDoc(docRef);
        this.documents = this.documents.filter(item => item.id !== id)
      } catch (error) {
        console.log(error);
      }
    },
  },
});
