import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type fn = (data: any) => void;

const fetchHeros = async (): Promise<any> => {
  return await axios.get('http://localhost:4000/heros');
};

const fetchHerosById = async (id: number): Promise<any> => {
  return await axios.get(`http://localhost:4000/heros/${id}`);
};

// Fetch all
export const useHeroDataQuerying = (onSuccess: fn, onError: fn) => {
  return useQuery({
    queryKey: ['heros'],
    queryFn: fetchHeros,
    onSuccess: onSuccess,
    onError: onError,
  });
};

// Fetch by Id
export const useHerosDataById = (id: number) => {
  return useQuery({
    queryKey: ['heros', id],
    queryFn: () => fetchHerosById(id),
  });
};
