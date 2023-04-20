import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

type heroType = {
  id: number;
  name: string;
  alterEgo: string;
};

type fn = (data: any) => void;

const fetchData = async () => {
  return await axios.get('http://localhost:4000/heros');
};

export const useQueryOnClick = (onSuccess: fn, onError: fn) => {
  return useQuery({
    queryKey: ['heros'],
    queryFn: fetchData,
    onSuccess: onSuccess,
    onError: onError,
    refetchOnMount: true, // fetch on component mount
    enabled: false, // disabled auto-fetch in background
    select: (data) => {
      const herosNames = data.data.map((hero: heroType) => hero.alterEgo);
      return herosNames;
    },
  });
};
