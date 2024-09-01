import { Container, Stack, Typography } from "@mui/material";

function AboutPage() {
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
          <Typography variant="h3">About</Typography>
          <Typography variant="body1">
            At the moment, clinicians can manually choose and assign assessments to patients, sometimes having to
            review each assessment before assigning it. In order to improve a clinician's ability to provide the
            right care, we have recently launched an innovative tool that allows a patient to take a diagnostic
            screener (a special assessment that covers a wide variety of symptoms) using our platform. Our system
            then scores a patient's response to this screener and automatically assigns assessments based on their
            symptoms.
          </Typography>
          </Stack>
      </Container>
    </>
  );
}

export default AboutPage;