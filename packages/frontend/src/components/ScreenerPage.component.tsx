import ScreenerProvider from "../context/screenerContext";
import Screener from "./screeners/Screener.component";

function ScreenerPage() {
  return (
    <>
      <div>
        <h1>ScreenerPage</h1>
      </div>
      <ScreenerProvider>
        <Screener />
      </ScreenerProvider>
    </>
  );
}

export default ScreenerPage;