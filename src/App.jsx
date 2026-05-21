* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: #111;
}

.page {
  min-height: 100vh;
  background: #111;
  color: #fff;
  overflow-x: hidden;
}

/* HEADER */

.header {
  height: 110px;
  background: linear-gradient(
    90deg,
    #ffffff 0%,
    #ffffff 25%,
    #c00000 25%,
    #a80000 100%
  );
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 56px;
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 4px 22px rgba(0, 0, 0, 0.35);
}

.logoPanel {
  width: 340px;
  height: 110px;
  background: #fff;
  border-bottom-right-radius: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logoImage {
  width: 265px;
  height: 95px;
  object-fit: contain;
}

.nav {
  display: flex;
  align-items: center;
  gap: 42px;
}

.nav a {
  color: #fff;
  text-decoration: none;
  font-size: 15px;
  font-weight: 800;
  position: relative;
  padding: 8px 0;
}

.nav a::after {
  content: "";
  width: 0;
  height: 2px;
  background: #fff;
  position: absolute;
  left: 0;
  bottom: 0;
  transition: 0.25s ease;
}

.nav a:hover::after {
  width: 100%;
}

/* HERO */

.hero {
  min-height: 560px;
  background-image: url("/images/hero.png");
  background-size: cover;
  background-position: center;
}

.heroOverlay {
  min-height: 560px;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.97) 0%,
    rgba(0, 0, 0, 0.78) 45%,
    rgba(0, 0, 0, 0.28) 100%
  );
  display: flex;
  align-items: center;
}

.heroContent {
  width: min(680px, 90%);
  margin-left: 7%;
}

.heroContent h1 {
  margin: 0 0 24px;
  font-size: clamp(44px, 5vw, 72px);
  line-height: 1.05;
  letter-spacing: -1.4px;
  color: #f7f7f7;
}

.heroContent p {
  margin: 0;
  font-size: 20px;
  line-height: 1.6;
  color: #f1f1f1;
}

.buttonRow {
  margin-top: 36px;
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
}

.primaryButton,
.secondaryButton,
.blackButton {
  display: inline-block;
  padding: 16px 34px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 800;
  transition: 0.25s ease;
}

.primaryButton {
  background: #c00000;
  color: #fff;
  box-shadow: 0 8px 24px rgba(192, 0, 0, 0.45);
}

.secondaryButton {
  background: transparent;
  color: #fff;
  border: 2px solid #fff;
}

.primaryButton:hover,
.secondaryButton:hover,
.blackButton:hover {
  transform: translateY(-2px);
}

/* SECTIONS */

.darkSection {
  padding: 56px 25px 66px;
  background: linear-gradient(180deg, #171717, #0d0d0d);
  border-top: 1px solid #333;
}

.lightSection {
  padding: 52px 25px 58px;
  background: #f7f7f7;
  color: #111;
}

.sectionLabel {
  margin: 0 0 8px;
  text-align: center;
  color: #ff1f1f;
  font-size: 14px;
  font-weight: 900;
  letter-spacing: 1.5px;
}

.sectionLabel.red {
  color: #c00000;
}

.sectionLabel.left {
  text-align: left;
}

.sectionTitle {
  max-width: 980px;
  margin: 0 auto 36px;
  text-align: center;
  color: #f7f7f7;
  font-size: clamp(25px, 3vw, 34px);
  line-height: 1.2;
}

.sectionTitle.dark {
  color: #111;
}

/* SERVICES */

.serviceGrid {
  max-width: 1180px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.serviceCard {
  min-height: 170px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid #454545;
  border-radius: 10px;
  padding: 30px;
  display: flex;
  align-items: center;
  gap: 28px;
}

.serviceIcon {
  width: 92px;
  height: 92px;
  object-fit: contain;
  flex-shrink: 0;
}

.serviceCard h3,
.valueCard h3 {
  margin: 0 0 10px;
  color: #fff;
  font-size: 20px;
  line-height: 1.15;
}

.serviceCard p,
.valueCard p {
  margin: 0;
  color: #d8d8d8;
  line-height: 1.55;
}

/* PROJECT SUPPORT */

.projectGrid {
  max-width: 1180px;
  margin: 30px auto 0;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
}

.projectItem {
  min-height: 135px;
  padding: 20px 16px;
  text-align: center;
  border-right: 1px solid #d0d0d0;
  font-weight: 900;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.projectItem:last-child {
  border-right: none;
}

.projectIcon {
  width: 70px;
  height: 70px;
  object-fit: contain;
  margin-bottom: 10px;
}

.projectItem p {
  margin: 0;
  font-size: 14px;
  line-height: 1.25;
}

/* ABOUT + CONTACT */

.aboutContactWrap {
  display: grid;
  grid-template-columns: 1.25fr 1.1fr 1.25fr;
  background: #111;
}

.aboutPanel {
  padding: 60px 50px;
}

.aboutPanel h2 {
  margin: 0 0 22px;
  font-size: 34px;
  line-height: 1.15;
}

.aboutPanel p {
  color: #d8d8d8;
  line-height: 1.75;
}

.valuePanel {
  padding: 55px 35px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.valueCard {
  padding: 20px 5px;
}

.contactPanel {
  background: linear-gradient(135deg, #d00000, #a80000);
  color: #fff;
  padding: 58px 50px;
}

.contactPanel h2 {
  margin: 0 0 18px;
  font-size: 32px;
  line-height: 1.15;
}

.contactPanel p {
  line-height: 1.6;
}

.contactDetails {
  margin-top: 20px;
}

.blackButton {
  margin-top: 18px;
  background: #050505;
  color: #fff;
}

/* FOOTER */

footer {
  background: #050505;
  color: #aaa;
  text-align: center;
  padding: 22px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

/* TABLET */

@media (max-width: 1100px) {
  .header {
    height: 96px;
    padding-right: 28px;
  }

  .logoPanel {
    width: 245px;
    height: 96px;
    border-bottom-right-radius: 32px;
  }

  .logoImage {
    width: 185px;
    height: 78px;
  }

  .nav {
    gap: 24px;
  }

  .serviceGrid {
    grid-template-columns: 1fr;
  }

  .serviceCard {
    max-width: 760px;
    margin: 0 auto;
  }

  .projectGrid {
    grid-template-columns: repeat(3, 1fr);
    row-gap: 22px;
  }

  .projectItem:nth-child(3) {
    border-right: none;
  }

  .aboutContactWrap {
    grid-template-columns: 1fr;
  }

  .valuePanel {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* MOBILE */

@media (max-width: 700px) {
  .header {
    height: auto;
    padding-right: 0;
    flex-direction: column;
    background: #b00000;
  }

  .logoPanel {
    width: 100%;
    height: 88px;
    border-bottom-right-radius: 34px;
  }

  .logoImage {
    width: 185px;
    height: 76px;
  }

  .nav {
    width: 100%;
    justify-content: center;
    gap: 18px;
    padding: 14px 10px;
    flex-wrap: wrap;
  }

  .nav a {
    font-size: 12px;
  }

  .hero,
  .heroOverlay {
    min-height: 560px;
  }

  .heroOverlay {
    text-align: center;
    justify-content: center;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.72),
      rgba(0, 0, 0, 0.96)
    );
  }

  .heroContent {
    width: 88%;
    margin: 0 auto;
  }

  .heroContent h1 {
    font-size: 34px;
    line-height: 1.12;
    letter-spacing: -0.5px;
  }

  .heroContent p {
    font-size: 15px;
    line-height: 1.65;
  }

  .buttonRow {
    justify-content: center;
  }

  .primaryButton,
  .secondaryButton,
  .blackButton {
    width: 100%;
    max-width: 270px;
    text-align: center;
    padding: 15px 20px;
  }

  .darkSection,
  .lightSection {
    padding: 46px 18px;
  }

  .sectionTitle {
    font-size: 24px;
  }

  .serviceCard {
    min-height: 255px;
    padding: 35px 24px;
    flex-direction: column;
    text-align: center;
  }

  .serviceIcon {
    width: 98px;
    height: 98px;
  }

  .projectGrid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0;
  }

  .projectItem {
    min-height: 150px;
    border-right: none;
    border-bottom: 1px solid #ddd;
  }

  .projectIcon {
    width: 64px;
    height: 64px;
  }

  .aboutPanel,
  .contactPanel {
    padding: 46px 25px;
    text-align: center;
  }

  .sectionLabel.left {
    text-align: center;
  }

  .aboutPanel h2,
  .contactPanel h2 {
    font-size: 28px;
  }

  .valuePanel {
    padding: 38px 25px;
    grid-template-columns: 1fr;
    text-align: center;
  }

  footer {
    font-size: 12px;
    line-height: 1.6;
    gap: 6px;
  }

  .footerDivider {
    display: none;
  }
}