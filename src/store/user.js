import { defineStore } from "pinia";
import router from "../router";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    userData: null,
    loadingUser: false,
  }),

  actions: {
    async registerUser(email, password) {
      this.loadingUser = true;

      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.userData = { email: user.email, uid: user.uid };
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingUser = false;
      }
    },

    async loginUser(email, password) {
      this.loadingUser = true;

      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.userData = { email: user.email, uid: user.uid };
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingUser = false;
      }
    },

    async logoutUser() {
      try {
        await signOut(auth).then((resp) => {
          router.push("/login");
        });
        this.userData = null;
      } catch (error) {
        console.log(error);
      }
    },

    currentUser() {
      return new Promise((reslve, reject) => {
        const unsuscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            this.userData = { email: user.email, uid: user.uid };
          } else {
            this.userData = null;
          }
          reslve(user);
        }, e => reject(e));

        unsuscribe()
      });
    },
  },
});
