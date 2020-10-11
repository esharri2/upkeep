// Libs
import Link from "../components/Link";

// Components
import ChevronRightSVG from "../media/icons/chevron-right.svg";
import GraphlineSVG from "../media/icons/graph-line.svg";

import HomeSVG from "../media/icons/home.svg";
import Icon from "../components/Icon";
import Layout from "../components/Layout";
import LinkAsButton from "../components/LinkAsButton";
import TodoSVG from "../media/icons/to-do.svg";

// Utils
import theme from "../styles/theme";
import useUser from "../hooks/useUser";

export default function Home() {
  const { email } = useUser();
  const iconWidth = { width: "100px" };
  return (
    <Layout>
      <section className="home-section">
        <div>
          <h1>Upkeep</h1>
          <p>A simple app for taking care of your less-than-simple home.</p>
          <div className="link-container">
            <div>
              <LinkAsButton bigText href="/signup">
                Create an account
              </LinkAsButton>
            </div>
            <div>
              <LinkAsButton bigText reverse href="/login">
                Log in with existing account
              </LinkAsButton>
            </div>
            <div>
              <LinkAsButton bigText reverse noBorder href="#features">
                Learn more
                <Icon>
                  <ChevronRightSVG />
                </Icon>
              </LinkAsButton>
            </div>
          </div>
        </div>
        <div className="home-image">
          <img width="467px" src="house-sm.jpg" />
        </div>
      </section>
      <section id="features" className="features">
        <div className="card">
          <Icon {...iconWidth}>
            <HomeSVG />
          </Icon>
          <p>
            This is some great text it is very good yay. This is some great text
            it is very good yay. This is some great text it is very good yay.
            This is some great text it is very good yay.
          </p>
        </div>
        <div className="card">
          <Icon {...iconWidth}>
            <TodoSVG />
          </Icon>
          <p>
            This is some great text it is very good yay. This is some great text
            it is very good yay. This is some great text it is very good yay.
          </p>
        </div>
        <div className="card">
          <Icon {...iconWidth}>
            <GraphlineSVG />
          </Icon>
          <p>
            This is some great text it is very good yay. This is some great text
            it is very good yay
          </p>
        </div>
      </section>

      {email && (
        <>
          <p>Hey! We logged you in automatically as {email}.</p>
          <Link href="/dashboard">Go to your dashboard.</Link>
        </>
      )}
      <style jsx>{`
        .home-section {
          display: flex;
          flex-direction: column;
        }

        .home-section > div:first-of-type {
          flex: 0 0 60%;
        }

        .home-image {
          flex: 0 0 40%;
        }

        .home-image img {
          width: 100%;
          border-radius: ${theme.borders.radius};
        }

        .home-image img::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.6);
          -moz-box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.6);
          -webkit-box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.6);
        }

        h1 {
          font-size: 3.5rem;
          color: ${theme.colors.accent1};
          margin: ${theme.spacing.l} 0;
          font-weight: 600;
          letter-spacing: -0.025em;
        }

        .home-section p {
          font-size: 2rem;
          margin: 0;
          line-height: 1.2;
          font-weight: 600;
        }

        .link-container {
          margin-top: ${theme.spacing.l};
          padding: ${theme.spacing.m} 0;
          width: 100%;
        }

        .link-container div {
          width: 100%;
          padding-bottom: ${theme.spacing.m};
          flex-direction: column;
          display: flex;
        }

        .learn-more {
          display: flex;
          align-items: center;
        }

        .features {
          display: grid;
          grid-gap: ${theme.spacing.m};
          margin: ${theme.spacing.xxl} 0;
        }

        .features p {
          text-align: center;
          font-size: ${theme.fontSizes.l};
        }

        .card {
          display: flex;
          flex-direction: column;
          align-items: center;
          border-radius: ${theme.borders.radius};
          padding: ${theme.spacing.m};
          fill: ${theme.colors.accent1};
          margin: ${theme.spacing.m};
        }

        @media screen and (${theme.mediaQueries.desktop}) {
          .home-section {
            flex-direction: row;
          }

          .home-section p {
            font-size: 4rem;
            padding-right: ${theme.spacing.m};
            letter-spacing: -0.05rem;
          }

          h1 {
            font-size: 5rem;
          }

          .features {
            grid-template-columns: 1fr 1fr 1fr;
          }

          .link-container {
            width: 50%;
          }
        }
      `}</style>
    </Layout>
  );
}
