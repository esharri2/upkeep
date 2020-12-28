// Libs
import { useRouter } from "next/router";

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
      <section className="home-section">
        <div className="home-section-title fade-in">
          <h1>
            <span className="accent">Upkeep</span> is a simple way to keep track
            of home maintenance.
          </h1>
          <div className="link-container">
            <div>
              <LinkAsButton bigText href="/signup">
                Create an account
              </LinkAsButton>
            </div>
            <div>
              <LinkAsButton bigText reverse noBorder href="#hero">
                Learn more
                <Icon>
                  <ChevronRightSVG />
                </Icon>
              </LinkAsButton>
            </div>
          </div>
        </div>
        <div className="home-image fade-in">
          <img width="467px" src="house-sm.jpg" />
        </div>
      </section>
      <section id="hero" className="features">
        <div className="hero-image full-bleed">
          <div className="text">
            <div>
              <h2>Homecare is hard.</h2>
              <p>
                From changing your air filter ever few months to descaling your
                water heater every few years, it's a lot to keep up with.
              </p>
            </div>
          </div>
          <img
            loading="lazy"
            srcSet="roof-sm.jpg 640w,
                  roof-lg.jpg 1280w,
                  roof-xl.jpg 2000w"
            src="room-sm.jpg"
          />
        </div>
      </section>
      <section id="features" className="features">
        <h2>Upkeep can help.</h2>

        <div className="card">
          <Icon {...iconWidth}>
            <HomeSVG />
          </Icon>
          <h3>Keep track of your assets</h3>
          <p>
            Keep a list of what you have in your home, inside and out. Store
            important details, like make, model, and purchase date.
          </p>
        </div>
        <div className="card">
          <Icon {...iconWidth}>
            <TodoSVG />
          </Icon>
          <h3>Know what to do and when to do it</h3>
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
          <h3>Create a record of your homecare history</h3>
          <p>Export your data to create a hard copy of your home maintenace.</p>
        </div>
        <div className="card">
          <h2 className="no-margin">Get started!</h2>

          <div className="link-container">
            <div>
              <LinkAsButton large centerText bigText href="/signup">
                Create an account
              </LinkAsButton>
            </div>
          </div>
        </div>
      </section>
      <style jsx>{`
        .no-margin {
          margin-bottom: 0;
        }
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
          box-shadow: ${theme.shadows.l};
        }

        .hero-image {
          position: relative;
        }

        .hero-image .text {
          display: flex;
          align-items: flex-end;
          margin: 0 ${theme.spacing.m};
        }

        h1 {
          font-size: 2.5rem;
          line-height: 1.1;
          margin-top: 0;
        }

        h2 {
          font-size: ${theme.fontSizes.xl};
          line-height: 1;
          color: ${theme.colors.accent1};
          text-align: center;
          margin-bottom: 0;
        }

        p:last-of-type {
          margin-bottom: 0;
        }

        .text > div {
          max-width: 600px;
          margin: 0 auto;
          z-index: 1;
          color: ${theme.colors.dark};
          text-align: center;
          padding-bottom: ${theme.spacing.xl};
        }

        .hero-image img {
          width: 100%;
          height: auto;
          object-fit: cover;
          object-position: center bottom;
          display: none;
          max-height: 75vh;
        }

        .features {
          margin-top: ${theme.spacing.l};
        }

        .accent {
          color: ${theme.colors.accent1};
          font-weight: 600;
        }

        .emphasis {
          color: ${theme.colors.accent1};
          font-weight: 600;
          text-align: center;
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

        .card {
          display: flex;
          flex-direction: column;
          align-items: center;
          fill: ${theme.colors.accent1};
          margin: ${theme.spacing.l} 0;
        }

        .card p {
          margin: 0 auto;
          font-size: ${theme.fontSizes.l};
          text-align: center;
          max-width: 400px;
        }

        .card h3 {
          color: ${theme.colors.accent1};
          font-size: ${theme.fontSizes.l};
          text-align: center;
        }

        @media screen and (${theme.mediaQueries.desktop}) {
          .home-section {
            flex-direction: row;
            min-height: 85vh;
          }

          .home-section-title {
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .home-section p {
            font-size: ${theme.fontSizes.xxl};
            padding-right: ${theme.spacing.m};
            letter-spacing: -0.05rem;
          }

          .hero-image img {
            display: block;
          }

          .hero-image .text {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            display: flex;
            align-items: flex-end;
            font-size: ${theme.fontSizes.xl};
          }

          h1 {
            font-size: ${theme.fontSizes.xxl};
            margin: 0;
            line-height: 1.2;
          }

          h2 {
            font-size: ${theme.fontSizes.xxl};
          }

          h3 {
            font-size: ${theme.fontSizes.xl};
          }

          .card {
            padding: ${theme.spacing.l};
            margin: ${theme.spacing.l};
          }

          .link-container {
            width: 50%;
          }
        }
      `}</style>
    </Layout>
  );
}
