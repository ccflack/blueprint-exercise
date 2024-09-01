import { Button, Container, Stack, Typography } from "@mui/material";

function WelcomePage() {
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
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}
        >
          <Typography variant="h3">Welcome</Typography>
          <Typography variant="body1">
            This is a simple evaluation tool help your provider understand your symptoms.
          </Typography>
          <Typography variant="body1">
            Click below to start the basic screener, which may recommend further evaluation or treatment.
          </Typography>
          <Button variant="contained" href="/screeners/1">Start</Button>
        </Stack>
      </Container>
    </>
  );
}

export default WelcomePage;