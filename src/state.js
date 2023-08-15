// src/state.js
import { atom } from "jotai";

export const userAtom = atom(null); // Par exemple, pour gérer l'utilisateur actuellement connecté
// Ajoutez d'autres atomes au besoin pour gérer d'autres états.
export const postsAtom = atom([]);
export const userProfileAtom = atom(null);
export const formDataAtom = atom({
  username: "",
  displayName: "",
  email: "",
  password: "",
  description: "",
  avatarUrl: "",
  role: 1,
});
export const loadingAtom = atom(true);
export const errorAtom = atom(null);
export const sortOrderAtom = atom("desc");
export const isUserLoggedInAtom = atom(false);
export const userLikesAtom = atom([]);
export const loginDataAtom = atom({
  identifier: "",
  password: "",
});

export const errorMsgAtom = atom("");
export const likesCountAtom = atom(0);
export const likedStatusAtom = atom(null); 
export const jwtAtom = atom(localStorage.getItem("jwt"), (get, set, action) => {
  if (action === null) {
    localStorage.removeItem("jwt");
  } else {
    localStorage.setItem("jwt", action);
  }
  set(jwtAtom, action); // update our atom's value
});
export const modalVisibleAtom = atom(false);

export const loginStateAtom = atom({
  token: localStorage.getItem("jwt") || null,
  userId: localStorage.getItem("userId") || null,
});
export const userPostCountAtom = atom(0);
export const pwaInstallPromptAtom = atom(null);