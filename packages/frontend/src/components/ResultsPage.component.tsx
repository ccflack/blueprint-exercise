import { Button, ButtonGroup, Container, Stack, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

function ResultsPage() {
  const location = useLocation();
  const results = location.state.results;

  interface Result {
    assessment: string;
  }

  const goToScreener = () => {
    // This is a placeholder for now. No data for other screeners.
    alert('Not Implemented');
  }
  const resultsBody =
    results.length > 0 ? (
      "Based on your results, further assessments may be recommended by your provider. Please complete:"
    ) : (
      "Based on your results, no further assessments are recommended at this time. Your provider will be in contact."
    );

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
          <Typography variant="h3">Results</Typography>
          <Typography variant="body1">
            {resultsBody}
          </Typography>
          <ButtonGroup aria-label="text button group">
            {results.map((result: Result, index: number) => (
              <Button key={index} onClick={goToScreener}>{result.assessment}</Button>
            ))}
          </ButtonGroup>
        </Stack>
      </Container>
    </>
  );
}

export default ResultsPage;