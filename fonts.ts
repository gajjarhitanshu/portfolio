import { Montserrat } from "next/font/google";

const montserratThin = Montserrat({ weight: "300", subsets: ["latin"] });
const montserrat = Montserrat({ weight: "500", subsets: ["latin"] });

const montserratLight = Montserrat({ weight: "300", subsets: ["latin"] });
const montserratRegular = Montserrat({ weight: "400", subsets: ["latin"] });
const montserratMedium = Montserrat({ weight: "500", subsets: ["latin"] });
const montserratSemiBold = Montserrat({ weight: "600", subsets: ["latin"] });
const montserratBold = Montserrat({ weight: "700", subsets: ["latin"] });
const montserratExtraBold = Montserrat({ weight: "800", subsets: ["latin"] });

export {
  montserrat,
  montserratThin,
  montserratLight,
  montserratRegular,
  montserratMedium,
  montserratSemiBold,
  montserratBold,
  montserratExtraBold,
};
