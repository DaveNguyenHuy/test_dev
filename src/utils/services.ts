import {
  collection,
  getDocs,
  query,
  addDoc,
  orderBy,
  limit,
  setDoc,
  doc
} from '@firebase/firestore';
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import { YouTubeGetID } from './constants';
import { Movie, ShareMovieDto } from './types';

const moviesCollection = collection(db, 'movies');

export const fetchMovies = async () => {
  try {
    const q = query(moviesCollection, orderBy('created_time', 'desc'), limit(100));
    const querySnapshot = await getDocs(q);
    const data: any = [];

    querySnapshot.forEach(async (doc) => {
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
  } catch (error) {
    alert('login failed');
  }
};

export const loginRegister = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
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

export const fetchVideoInformation = async (url: string) => {
  try {
    const id = YouTubeGetID(url);
    if (!id) return null;
    const data = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&id=${id}`
    );
    const result = await data.json();
    if (!result.items || !result.items.length) {
      return null;
    }
    return result;
  } catch (error) {
    console.log('error', error);
  }
};

export const shareMovie = (data: ShareMovieDto) => {
  return addDoc(moviesCollection, {
    ...data,
    created_time: new Date().toISOString()
  });
};

export const updateMovieService = (movie: Movie) => {
  const { id, ...data } = movie;
  return setDoc(doc(db, 'movies', id), data, { merge: true });
};
