// Libs
import Link from "next/link";
import { mutate } from "swr";

// Components

// Utils
import { postAssets } from "../utils/client/fetchers";
import useUser from "../hooks/useUser";

export default function AssetCard({ asset }) {
  const { token } = useUser();
  const handleAdd = async () => {
    postAssets(
      token,
      {
        body: JSON.stringify({ owned: true }),
      },
      asset._id
    )
      .then(() => {
        mutate(["/api/assets", token]);
      })
      .catch((error) => alert("error"));
  };

  const handleRemove = async () => {
    postAssets(
      token,
      {
        body: JSON.stringify({ owned: false }),
      },
      asset._id
    )
      .then(() => {
        mutate(["/api/assets", token]);
      })
      .catch((error) => alert("error"));
  };

  return (
    <div>
      <h2>{asset.name}</h2>
      {asset.owned ? (
        <>
          <Link href={`/assets/${asset._id}`}>
            <a>Edit</a>
          </Link>
          <button onClick={handleRemove}>Remove</button>
        </>
      ) : (
        <button onClick={handleAdd}>Add</button>
      )}
    </div>
  );
}
