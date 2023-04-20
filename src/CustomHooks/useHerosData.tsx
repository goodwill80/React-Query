import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type heroType = {
  id: number;
  name: string;
  alterEgo: string;
};

type fn = (data: any) => void;

const fetchHeros = async (): Promise<any> => {
  return await axios.get('http://localhost:4000/heros');
};

// Names
export const useHerosDataNames = (onSuccess: fn, onError: fn) => {
  return useQuery({
    queryKey: ['super-heros'],
    queryFn: fetchHeros,
    onSuccess: onSuccess,
    onError: onError,
    select: (data) => {
      const herosNames = data.data.map((hero: heroType) => hero.alterEgo);
      return herosNames;
    },
  });
};

// All Data
export const useHerosData = (onSuccess: fn, onError: fn) => {
  return useQuery({
    queryKey: ['super-heros'],
    queryFn: fetchHeros,
    onSuccess: onSuccess,
    onError: onError,
  });
};
