import CTA from "../components/CTA";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { ExerciseFeed } from "../sections/ExerciseFeed";
import { RoutineDetails } from "../sections/RoutineDetails";
import StoreProvider from "./StoreProvider";

export default function Page(): JSX.Element {
  return (
    <StoreProvider>
      <NavBar />
      <RoutineDetails />
      <ExerciseFeed />
      <CTA />
      <Footer />
    </StoreProvider>
  );
}
