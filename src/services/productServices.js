import { FirebaseStore } from "../library/firebase";
import { collection, getDocs } from "firebase/firestore/lite";

export const productsCollection = collection(FirebaseStore, "products");

export async function getProducts() {
  const querySnapshot = await getDocs(productsCollection);
  if (querySnapshot) {
    return querySnapshot.docs.map((doc) => doc.data());
  } else {
    throw new Error("error occured while fetching products");
  }
}
