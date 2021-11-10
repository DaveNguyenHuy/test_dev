import { collection, getDocs, query } from '@firebase/firestore';
import { db } from './firebase';

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
