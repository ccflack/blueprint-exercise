import { Container, Grid2 } from "@mui/material";
import ScreenerProvider from "../context/screenerContext";
import Screener from "./screeners/Screener.component";

function ScreenerPage() {
  return (
    <>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Grid2 container justifyContent="center">
          <Grid2 >
            <ScreenerProvider>
              <Screener />
            </ScreenerProvider>
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
}

export default ScreenerPage;