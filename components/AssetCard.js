// Libs
import { mutate } from "swr";

// Components
import Button from "./Button";
import CrossSVG from "../media/icons/cross.svg";
import Icon from "./Icon";
import EditSVG from "../media/icons/pencil.svg";
import LinkAsButton from "./LinkAsButton";
import PlusSVG from "../media/icons/plus.svg";

// Utils
import { postAssets } from "../utils/client/fetchers";
import theme from "../styles/theme";
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
    <div className="card">
      <h2>{asset.name}</h2>
      <div className="buttons">
        {asset.owned ? (
          <>
            <LinkAsButton aria-label="Edit" href={`/assets/${asset._id}`}>
              <Icon width="1rem">
                <EditSVG />
              </Icon>
              Edit
            </LinkAsButton>
            <Button reverse onClick={handleRemove}>
              <Icon>
                <CrossSVG />
              </Icon>
              Remove
            </Button>
          </>
        ) : (
          <Button onClick={handleAdd}>
            <Icon>
              <PlusSVG />
            </Icon>
            Add
          </Button>
        )}
      </div>
      <style jsx>{`
        .card {
          padding: ${theme.spacing.m};
          fill: ${theme.colors.accent1};
          border-bottom: solid 1px ${theme.colors.middle};
        }

        h2 {
          margin: 0 0 ${theme.spacing.m} 0;
          font-size: ${theme.fontSizes.l};
        }

        .buttons {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
}
