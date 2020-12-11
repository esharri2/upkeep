// Libs
import { useRouter } from "next/router";

// Components
import ChevronRightSVG from "../media/icons/chevron-right.svg";
import GraphlineSVG from "../media/icons/graph-line.svg";

import HomeSVG from "../media/icons/home.svg";
import Icon from "../components/Icon";
import Layout from "../components/Layout";
import LinkAsButton from "../components/LinkAsButton";
import StatusBanner from "../components/StatusBanner";
import TodoSVG from "../media/icons/to-do.svg";

// Utils
import theme from "../styles/theme";
import useUser from "../hooks/useUser";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { email } = useUser();

  useEffect(() => {
    // Send user to dashboard if they are already logged in
    // TODO this feels glitchy, since you see the home page first ...
    if (email) {
      router.push("/dashboard");
    }
  }, [email]);

  const iconWidth = { width: "100px" };
  return (
    <Layout>
      <StatusBanner type="success">
        Hello friends. Everything is going very well!
      </StatusBanner>
      <section className="home-section">
        <div className="home-section-title">
          <h1>
            <span className="accent">Upkeep</span> is a simple way to stay on
            top of home maintenance.
          </h1>
          <div className="link-container">
            <div>
              <LinkAsButton centerText bigText href="/signup">
                Create an account
              </LinkAsButton>
            </div>
            {/* <div>
              <LinkAsButton bigText reverse href="/login">
                Log in with existing account
              </LinkAsButton>
            </div> */}
            <div>
              <LinkAsButton
                bigText
                centerText
                reverse
                noBorder
                href="#features">
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
        <div>
          <h2>Homecare is hard.</h2>
          <p>
            Changing your furnance filter. Checking your gutters for leaks.
            Clearing the shower drain.
          </p>
          <p>
            It's a lot to keep up with. And you may not even be doing everything
            you need to do to ensure the longevity and value of your home.{" "}
            <span className="accent">Upkeep can help!</span>
          </p>
        </div>
        <div className="card">
          <Icon {...iconWidth}>
            <HomeSVG />
          </Icon>
          <h2>Keep track of your assets</h2>
          <p>
            Keep a list of what you have in your home, inside and out. Store
            important details, like make, model, and purchase date.
          </p>
        </div>
        <div className="card">
          <Icon {...iconWidth}>
            <TodoSVG />
          </Icon>
          <h2>Know what to do and when to do it</h2>
          <p>
            Based on your list of assets, we'll tell you what you need to do to
            take care of them. Descaled your hot water heater? Enter the date
            and we'll let you know when to do it again.
          </p>
        </div>
        <div className="card">
          <Icon {...iconWidth}>
            <GraphlineSVG />
          </Icon>
          <h2>Create a record of your homecare history</h2>
          <p>
            This is some great text it is very good yay. This is some great text
            it is very good yay
          </p>
        </div>
      </section>

      <style jsx>{`
        .home-section {
          display: flex;
          flex-direction: column;
          align-items: center;
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
          font-size: 3rem;
        }

        .accent {
          color: ${theme.colors.accent1};
        }

        h2 {
          color: ${theme.colors.accent1};
          text-align: center;
          margin-bottom: 0;
        }

        h2:first-of-type {
          font-size: 2rem;
        }

        .emphasis {
          color: ${theme.colors.accent1};
          font-weight: 600;
          text-align: center;
        }

        .home-section p {
          font-size: 2rem;
          margin: 0;
          line-height: 1.2;
          font-weight: 600;
        }

        p + p {
          margin-top: 0;
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
          font-size: ${theme.fontSizes.l};
        }

        .card {
          display: flex;
          flex-direction: column;
          align-items: center;
          border-radius: ${theme.borders.radius};
          padding: ${theme.spacing.m} 0;
          fill: ${theme.colors.accent1};
          margin: ${theme.spacing.m};
        }

        @media screen and (${theme.mediaQueries.desktop}) {
          .home-section {
            flex-direction: row;
            min-height: 80vh;
          }

          .home-section-title {
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .home-section p {
            font-size: 4rem;
            padding-right: ${theme.spacing.m};
            letter-spacing: -0.05rem;
          }

          h1 {
            font-size: 4rem;
            margin: 0;
            line-height: 1.2;
          }

          .features {
            grid-template-columns: 1fr 1fr 1fr;
          }

          .link-container {
            width: 50%;
          }

          .features > div:first-child {
            grid-column-start: 1;
            grid-column-end: 4;
            text-align: center;
            padding: 0 10vw;
            font-size: 3rem;
          }

          .features > div:first-child h2 {
            font-size: inherit;
          }

          .features > div:first-child p {
            font-size: 1.7rem;
          }
        }
      `}</style>
    </Layout>
  );
}
