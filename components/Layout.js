export default function Layout({ children }) {
  return (
    <div>
      {children}
      <style jsx global>{`
        .container {
          margin: 50px;
        }
        p {
          color: blue;
        }
      `}</style>
    </div>
  );
}
