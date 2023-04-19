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
// You can get all the variables from the queryKey object
// 1. api/posts - ["posts"]
// 2. api/posts/1 - ["posts", post.id]
// 3. api/posts?authorId=1 - ["posts", { authorId: 1}]
// 4. api/2/comments - ["posts", post.id, "comments"]

function BasicQueryAndMutate() {
  // Get the queryClient
  const queryClient = useQueryClient();

  // UseQuery - all data fetch is cache, if there is changes RQ will do a refetch in background
  const postQuery = useQuery({
    queryKey: ['posts'],
    queryFn: ({ queryKey }) =>
      wait(1000).then(() => {
        console.log(queryKey);
        return [...POSTS];
      }),
    // If you want stale to remain in cache for 1 sec before changing status
    // staleTime: 1000,
    // Refetching of data after every 1 sec interval *** Very useful for data refresh!!
    // refetchInterval: 1000,
  });
  console.log(postQuery.data);

  // UseMutation
  const newPostMutation = useMutation({
    mutationFn: (title: string) => {
      return wait(1000).then(() =>
        POSTS.push({ id: crypto.randomUUID(), title })
      );
    },
    // Clear cache on ["posts"] and refetch on successful mutation
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
  });

  if (postQuery.isLoading) return <h1>Loading...</h1>;
  if (postQuery.isError) return <pre>{JSON.stringify(postQuery.error)}</pre>;
  return (
    <div>
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

export default BasicQueryAndMutate;
