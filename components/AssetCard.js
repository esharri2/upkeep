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
import useStatus from "../hooks/useStatus";

export default function AssetCard({ asset }) {
  const { token } = useUser();
  const { setStatus } = useStatus();

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
      .catch((error) => {
        setStatus({ type: "error", message: error });
      });
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
        setStatus({ type: "success" });
        mutate(["/api/assets", token]);
      })
      .catch((error) => {
        setStatus({ type: "error", message: error });
      });
  };

  return (
    <section className="card">
      <h2 className={asset.owned ? "owned" : "unowned"}>{asset.name}</h2>
      <div className="buttons">
        {asset.owned ? (
          <>
            <LinkAsButton
              aria-label="Edit"
              href="/assets/[id]"
              as={`/assets/${asset._id}`}>
              <Icon width="1rem">
                <EditSVG />
              </Icon>
              Edit details
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
          padding: ${theme.spacing.m} 0;
          fill: ${theme.colors.accent1};
          border-bottom: solid 1px ${theme.colors.middle};
        }

        .card:first-of-type {
          margin-top: ${theme.spacing.m};
        }

        .card.unowned {
          background-color: ${theme.colors.disabled};
        }

        h2 {
          margin: 0 0 ${theme.spacing.s} 0;
          font-size: ${theme.fontSizes.l};
        }

        h2.unowned {
          color: ${theme.colors.disabledText};
        }

        .buttons {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </section>
  );
}
