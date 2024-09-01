import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { ScreenerContext } from "../../context/screenerContext";
import { ScreenerContextType } from "../../@types/screener";
import Question from "./Question.component";
import Answers from "./Answers.component";
import Review from "./Review.component";
import { AppBar, Box, Button, Card, CardActions, CardContent, Chip, Divider, Grid2, LinearProgress, Typography } from "@mui/material";

function Screener() {
  const { id } = useParams<{id: string}>();
  const {
    screener,
    setScreener,
    answerValue,
    setAnswerValue,
    appendPatientResponse,
  } = useContext(ScreenerContext) as ScreenerContextType;
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [screenerComplete, setScreenerComplete] = useState<boolean>(false);

  const baseURL = "http://localhost:4000";

  useEffect(() => {
    const fetchScreener = async () => {
      try {
        const response = await axios.get(`${baseURL}/screeners/${id}`);
        setScreener(response.data.frontEndData);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchScreener();
  }, [id, setScreener]);

  // If loading is true, display a loading message.
  if (loading) {
    return <p>Loading...</p>
  }

  // If screener is not set, display a message.
  if (!screener) {
    return <p>Not found</p>
  }

  const questionCount = screener.sections.map(section => section.questions.length).reduce((acc, val) => acc + val, 0);
  const progressText = `${currentQuestionIndex + 1} / ${questionCount}`;
  const progress = (currentQuestionIndex + 1) / questionCount * 100;

  const handleNext = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (answerValue === null) {
      throw new Error('Please select an answer');
    }

    appendPatientResponse(
      screener.sections[currentSectionIndex].questions[currentQuestionIndex].question_id,
      answerValue
    );

    if (currentQuestionIndex < screener.sections[currentSectionIndex].questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentSectionIndex < screener.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentQuestionIndex(0);
    } else if (currentQuestionIndex === screener.sections[currentSectionIndex].questions.length - 1 &&
        currentSectionIndex === screener.sections.length - 1) {
          setScreenerComplete(true);
    }
    setAnswerValue(null);
  }

  return (
    <>
      { screenerComplete ? (
        <Review />
      ) : (
        <Card>
          <CardContent>
            <AppBar position="static">
              <Grid2 container justifyContent="center">
                <Typography variant="overline" component="div">
                  {screener.full_name}
                </Typography>
              </Grid2>
              <LinearProgress variant="determinate" value={progress} />
            </AppBar>
            <Box m={2} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography gutterBottom variant="h6" component="div">
                {screener.sections[currentSectionIndex].section_text}
              </Typography>
            </Box>
            <Question
              currentQuestionIndex={currentQuestionIndex}
              currentSectionIndex={currentSectionIndex}
            />
            <Divider>
              <Chip label={progressText} size="small" />
            </Divider>
            <Box mt={2}>
              <Answers answerOptions={screener.sections[currentSectionIndex].answer_options}/>
            </Box>
          </CardContent>
          <Grid2 m={2} container justifyContent="center">
            <CardActions>
              <Button variant="outlined" onClick={handleNext}>
                Next
              </Button>
            </CardActions>
          </Grid2>
        </Card>
      )}
    </>
  );
}

export default Screener;