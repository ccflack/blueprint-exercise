import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ScreenerContext } from "../../context/screenerContext";
import { ScreenerContextType } from "../../@types/screener";
import { IAnswerOption } from "../../@types/answeOption";
import axios from "axios";

import { Box, Button, Card, CardActions, CardContent, Grid2, List, ListItem, Stack, Typography } from "@mui/material";

function Review() {
  const navigate = useNavigate();
  const {
    screener,
    patientResponse,
  } = useContext(ScreenerContext) as ScreenerContextType;
  const [submitting, setSubmitting] = useState<boolean>(false);

  const baseURL = "http://localhost:4000";

  const submitPatientResponse = async () => {
    try {
      await axios.post(`${baseURL}/patient-responses`, patientResponse).then((response) => {
        setSubmitting(false);
        navigate('/results', { replace: false, state: { results: response.data } });
      });
    } catch (error) {
      console.log(error);
    }
  }

  const editQuestion = () => {
    // I mocked up the UI for this review page, and like the way it looks, but this is not a requirement,
    // so I'm leaving this as a placeholder for now. This is a nice-to-have feature that could be added.
    alert('Not Implemented');
  }

  const matchResponse = (answerOptions: IAnswerOption[], questionId: string) => {
    if (!patientResponse) {
      throw new Error('Patient response is not set');
    }

    const answer = patientResponse.answers.find(answer => answer.question_id === questionId);
    const answerOption = answerOptions.find(option => option.value === answer?.value);
    return answerOption ? `(${answerOption?.value}) ${answerOption?.title}` : 'No response';
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setSubmitting(true);
    submitPatientResponse();
  }

  return (
    <div>
      <Card>
        <CardContent>
          <Grid2 container justifyContent="center">
            <Typography variant="h6" component="div">
              Thanks for completing the {screener?.name} screener!
            </Typography>
          </Grid2>
          <Grid2 spacing={2} container justifyContent="center">
            <Typography variant="h6" component="div">
              Here's how you responded:
            </Typography>
            {screener?.sections.map((section, sectionIndex) => (
              <Box key={sectionIndex}>
                <Typography variant="h6" component="div">
                  {section.section_text}
                </Typography>
                <List dense>
                {section.questions.map((question, questionIndex) => (
                    <ListItem
                      key={questionIndex}
                      disablePadding
                      dense
                      divider
                      secondaryAction={
                        <Button variant="outlined" onClick={editQuestion}>
                          Edit
                        </Button>
                      }
                    >
                      <Stack m={2} spacing={2} justifyContent="space-between">
                        <Typography variant="body1" component="div">
                          {question.question_text}
                        </Typography>
                        <Box>
                          <Typography variant="body2" component="div">
                            {matchResponse(section.answer_options, question.question_id)}
                          </Typography>
                        </Box>
                      </Stack>
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))}
          </Grid2>
        </CardContent>
        <Grid2 m={2} container justifyContent="center">
          <CardActions>
            <Button variant="outlined" onClick={handleSubmit} disabled={submitting}>
              { submitting ? "Submitting..." : "Submit" }
            </Button>
          </CardActions>
        </Grid2>
      </Card>
    </div>
  );
};

export default Review;