* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.page {
  background: #111;
  color: white;
  min-height: 100vh;
}

.header {
  height: 110px;
  background: linear-gradient(90deg, #fff 0%, #fff 25%, #c00000 25%, #a80000 100%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 55px;
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 4px 20px rgba(0,0,0,0.35);
}

.logoPanel {
  height: 110px;
  width: 340px;
  background: #fff;
  border-bottom-right-radius: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logoImage {
  width: 260px;
  height: 95px;
  object-fit: contain;
}

.nav {
  display: flex;
  gap: 42px;
}

.nav a {
  color: white;
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
}

.hero {
  min-height: 560px;
  background-image: url("/images/hero.png");
  background-size: cover;
  background-position: center;
}

.heroOverlay {
  min-height: 560px;
  background: linear-gradient(90deg, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.76) 45%, rgba(0,0,0,0.28) 100%);
  display: flex;
  align-items: center;
}

.heroContent {
  width: min(680px, 90%);
  margin-left: 7%;
}

.heroContent h1 {
  font-size: clamp(44px, 5vw, 72px);
  line-height: 1.05;
  margin: 0 0 24px;
  letter-spacing: -1px;
}

.heroContent p {
  font-size: 20px;
  line-height: 1.6;
  color: #f1f1f1;
  margin: 0;
}

.buttonRow {
  margin-top: 35px;
  display: flex;
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
  font-weight: 700;
  transition: 0.25s ease;
}

.primaryButton {
  background: #c00000;
  color: white;
  box-shadow: 0 8px 22px rgba(192,0,0,0.4);
}

.secondaryButton {
  color: white;
  border: 2px solid white;
}

.primaryButton:hover,
.secondaryButton:hover,
.blackButton:hover {
  transform: translateY(-2px);
}

.darkSection {
  padding: 55px 25px 65px;
  background: linear-gradient(180deg, #171717, #0d0d0d);
  border-top: 1px solid #333;
}

.sectionLabel {
  text-align: center;
  color: #ff1f1f;
  font-weight: 800;
  letter-spacing: 1.5px;
  margin: 0 0 8px;
  font-size: 14px;
}

.sectionLabel.red {
  color: #c00000;
}

.sectionLabel.left {
  text-align: left;
}

.sectionTitle {
  max-width: 980px;
  margin: 0 auto 35px;
  font-size: clamp(25px, 3vw, 34px);
  text-align: center;
  color: #f5f5f5;
}

.sectionTitle.dark {
  color: #111;
}

.serviceGrid {
  max-width: 1180px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.serviceCard {
  min-height: 165px;
  background: rgba(255,255,255,0.04);
  border: 1px solid #444;
  border-radius: 10px;
  padding: 30px;
  display: flex;
  align-items: center;
  gap: 28px;
}

.serviceIcon {
  width: 88px;
  height: 88px;
  object-fit: contain;
  flex-shrink: 0;
}

.serviceCard h3,
.valueCard h3 {
  color: white;
  margin: 0 0 10px;
  font-size: 20px;
}

.serviceCard p,
.valueCard p {
  color: #d8d8d8;
  line-height: 1.55;
  margin: 0;
}

.lightSection {
  padding: 50px 25px 55px;
  background: #f7f7f7;
  color: #111;
}

.projectGrid {
  max-width: 1180px;
  margin: 30px auto 0;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
}

.projectItem {
  text-align: center;
  padding: 20px 16px;
  border-right: 1px solid #d0d0d0;
  font-weight: 800;
}

.projectItem:last-child {
  border-right: none;
}

.projectIcon {
  width: 68px;
  height: 68px;
  object-fit: contain;
  margin-bottom: 10px;
}

.projectItem p {
  margin: 0;
  font-size: 14px;
}

.aboutContactWrap {
  display: grid;
  grid-template-columns: 1.25fr 1.1fr 1.25fr;
  background: #111;
}

.aboutPanel {
  padding: 60px 50px;
}

.aboutPanel h2 {
  font-size: 34px;
  margin: 0 0 22px;
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
  color: white;
  padding: 58px 50px;
}

.contactPanel h2 {
  font-size: 32px;
  margin: 0 0 18px;
}

.contactPanel p {
  line-height: 1.6;
}

.blackButton {
  margin-top: 18px;
  background: #050505;
  color: white;
}

footer {
  background: #050505;
  color: #aaa;
  text-align: center;
  padding: 22px;
  font-size: 14px;
}

/* TABLET */
@media (max-width: 1024px) {
  .header {
    height: 92px;
    padding-right: 25px;
  }

  .logoPanel {
    height: 92px;
    width: 230px;
    border-bottom-right-radius: 28px;
  }

  .logoImage {
    width: 170px;
    height: 75px;
  }

  .nav {
    gap: 22px;
  }

  .serviceGrid {
    grid-template-columns: 1fr;
  }

  .serviceCard {
    max-width: 720px;
    margin: 0 auto;
  }

  .projectGrid {
    grid-template-columns: repeat(3, 1fr);
    row-gap: 25px;
  }

  .aboutContactWrap {
    grid-template-columns: 1fr;
  }

  .valuePanel {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* MOBILE */
@media (max-width: 650px) {
  .header {
    height: auto;
    padding: 0;
    flex-direction: column;
    background: #b00000;
  }

  .logoPanel {
    width: 100%;
    height: 88px;
    border-bottom-right-radius: 32px;
  }

  .logoImage {
    width: 185px;
    height: 78px;
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

  .hero {
    min-height: 560px;
  }

  .heroOverlay {
    min-height: 560px;
    background: linear-gradient(180deg, rgba(0,0,0,0.72), rgba(0,0,0,0.95));
    text-align: center;
    justify-content: center;
  }

  .heroContent {
    margin: 0 auto;
    width: 88%;
  }

  .heroContent h1 {
    font-size: 34px;
    line-height: 1.12;
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
    max-width: 260px;
    text-align: center;
    padding: 15px 20px;
  }

  .darkSection,
  .lightSection {
    padding: 45px 18px;
  }

  .sectionTitle {
    font-size: 24px;
  }

  .serviceCard {
    flex-direction: column;
    text-align: center;
    padding: 35px 24px;
    min-height: 255px;
  }

  .serviceIcon {
    width: 95px;
    height: 95px;
  }

  .projectGrid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0;
  }

  .projectItem {
    border-right: none;
    border-bottom: 1px solid #ddd;
    min-height: 150px;
  }

  .projectIcon {
    width: 62px;
    height: 62px;
  }

  .aboutPanel,
  .contactPanel {
    padding: 45px 25px;
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
    padding: 35px 25px;
    grid-template-columns: 1fr;
    text-align: center;
  }

  footer {
    font-size: 12px;
    line-height: 1.6;
  }
}