import { useContext } from "react";
import { ScreenerContext } from "../../context/screenerContext";
import { ScreenerContextType } from "../../@types/screener";

import { Box, Grid2, Typography } from "@mui/material";

type QuestionProps = {
  currentSectionIndex: number;
  currentQuestionIndex: number;
}

function Question(props: QuestionProps) {
  const { screener } = useContext(ScreenerContext) as ScreenerContextType;
  const { currentSectionIndex, currentQuestionIndex } = props;

  const currentQuestion = screener?.sections[currentSectionIndex].questions[currentQuestionIndex];

  return (
    <>
      <Box mb={2}>
        <Grid2 container justifyContent="center">
          <Typography variant="body1">
            {currentQuestion?.question_text}
          </Typography>
        </Grid2>
      </Box>
    </>
  );
};

export default Question;