import useSWR from "swr";

export default function BookList(props) {
  const token = props?.user?.token;

  const getBooks = async () => {
    const res = await fetch("/api/books", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await res.json();
    return json;
  };

  const { data, error } = useSWR("/api/books", getBooks);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const { books } = data;

  return (
    <ul>
      {books.map((book) => (
        <li key={book._id}>
          {book.title} / {book.author}
        </li>
      ))}
    </ul>
  );
}
