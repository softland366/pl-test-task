import { default as SmartFooter } from "./components/SmartFooter";
import { default as PageHeader } from "./components/PageHeader";
import { default as SelectOfferPopup } from "./components/SelectOfferPopup";
import { default as HallMapPage } from "./pages/HallMapPage";
import { default as OrderDetailsPage } from "./pages/OrderDetailsPage";
import { default as StartPage } from "./pages/StartPage";
import { default as CheckoutPage } from "./pages/CheckoutPage";

export const pageHeader = new PageHeader();
export const smartFooter = new SmartFooter();
export const selectOfferPopup = new SelectOfferPopup();
export const startPage = new StartPage();
export const hallMapPage = new HallMapPage();
export const orderDetailsPage = new OrderDetailsPage();
export const checkoutPage = new CheckoutPage();