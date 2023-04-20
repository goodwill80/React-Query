// Dependent queries - need to fetch the data of one api, then use part of the data to fetch another api

// import { useQueries, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

type PropsType = {
  email: string;
};

// Fetch User
const fetchUserByEmail = (email: string) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

// Fetch Courses
const fetchCoursesByChannelId = (id: string) => {
  return axios.get(`http://localhost:4000/channels/${id}`);
};

function DependentQueries({ email }: PropsType) {
  // Step 1 - get channel ID from user
  const { data: user } = useQuery({
    queryKey: ['user', email],
    queryFn: () => fetchUserByEmail(email),
  });
  // Step 2 - store channel id in a variable
  const channelId: string = user?.data.channelId;
  // Step 3 - to fire only if the channel ID had been retrieved
  const { data: courses } = useQuery({
    queryKey: ['courses', channelId],
    queryFn: () => fetchCoursesByChannelId(channelId),
    enabled: !!channelId, // !! converts to a boolean, hence query will only enable if there is a channelId
  });

  console.log(courses);

  return <div></div>;
}

export default DependentQueries;
