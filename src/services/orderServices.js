import { FirebaseStore } from "../library/firebase";
import { addDoc, collection } from "firebase/firestore/lite";

export const ordersCollection = collection(FirebaseStore, "orders");

export async function addOrder(order) {
  try {
    await addDoc(ordersCollection, order);
  } catch (error) {
    throw error;
  }
}
