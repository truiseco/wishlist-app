import { db } from '@/lib/firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  getDocs,
  query,
  where 
} from 'firebase/firestore';

export const wishlistService = {
  // Create a new wishlist
  async createWishlist(userId, userData) {
    const docRef = doc(db, 'wishlists', userId);
    await setDoc(docRef, {
      items: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userEmail: userData.email,
      userName: userData.displayName,
      userId: userId,
      authorized: false, // Default to unauthorized
      deliveryAddress: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        specialInstructions: ''
      }
    });
  },

  // Get a user's wishlist
  async getWishlist(userId) {
    const docRef = doc(db, 'wishlists', userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  },

  // Get all authorized wishlists
  async getAllWishlists() {
    const q = query(
      collection(db, 'wishlists'),
      where('authorized', '==', true)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  // Update a wishlist
  async updateWishlist(userId, wishlistData) {
    const docRef = doc(db, 'wishlists', userId);
    const currentData = (await getDoc(docRef)).data();
    await setDoc(docRef, {
      ...wishlistData,
      authorized: currentData?.authorized ?? false, // Preserve authorized status
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  },

  // Update wishlist details
  async updateWishlistDetails(userId, details) {
    const docRef = doc(db, 'wishlists', userId);
    const currentData = (await getDoc(docRef)).data();
    await setDoc(docRef, {
      ...details,
      authorized: currentData?.authorized ?? false, // Preserve authorized status
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  }
};
