import { collection, getDocs, query } from '@firebase/firestore';
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';

const moviesCollection = collection(db, 'movies');

export const fetchMovies = async () => {
  try {
    const q = query(moviesCollection);
    const querySnapshot = await getDocs(q);
    const data: any = [];
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return data;
  } catch (error) {
    return [];
  }
};

const register = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await signInWithEmailAndPassword(auth, email, password);
    window.location.reload();
  } catch (error) {
    alert('login failed');
  }
};

export const loginRegister = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.reload();
  } catch (error: any) {
    const { message } = error;
    if (message && message.includes('auth/user-not-found')) {
      await register(email, password);
    } else {
      alert('login failed');
    }
  }
};

export const logOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.log(error);
  }
};
