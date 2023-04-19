// npm i @tanstack/react-query
// npm i @tanstack/react-query-devtools

import './App.css';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

type postType = {
  id: string | number;
  title: string;
};

const POSTS: postType[] = [
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' },
];

// Variation of returns from API and what to put for queryKey


function App() {
  // Get the queryClient
  const queryClient = useQueryClient();
  // UseQuery
  const postQuery = useQuery({
    queryKey: ['posts'],
    queryFn: () => wait(1000).then(() => [...POSTS]),
  });
  console.log(postQuery.data);
  // UseMutation
  const newPostMutation = useMutation({
    mutationFn: (title: string) => {
      return wait(1000).then(() =>
        POSTS.push({ id: crypto.randomUUID(), title })
      );
    },
    // Clear cache and refetch on successful mutation
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
  });

  if (postQuery.isLoading) return <h1>Loading...</h1>;
  if (postQuery.isError) return <pre>{JSON.stringify(postQuery.error)}</pre>;

  return (
    <div className="App">
      {postQuery.data.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
      <button
        disabled={newPostMutation.isLoading}
        onClick={() => newPostMutation.mutate('new Post')}
      >
        Add
      </button>
    </div>
  );
}

const wait = (duration: number) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

export default App;
