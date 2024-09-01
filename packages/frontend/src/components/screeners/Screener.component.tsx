import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { ScreenerContext, initialScreener, initialPatientResponse } from "../../context/screenerContext";
import { ScreenerContextType } from "../../@types/screener";
import Question from "./Question.component";
import Answer from "./Answer.component";
import Review from "./Review.component";
function Screener() {
  const { id } = useParams<{id: string}>();
  const {
    screener,
    setScreener,
    answerValue,
    setPatientResponse,
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
    return () => {
      setScreener(initialScreener);
      setPatientResponse(initialPatientResponse)
    }
  }, [id]);

  // If loading is true, display a loading message.
  if (loading) {
    return <p>Loading...</p>
  }

  // If screener is not set, display a message.
  if (!screener) {
    return <p>Not found</p>
  }

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
  }

  return (
    <>
      <h3>{screener.full_name}</h3>
      <h4>{screener.sections[currentSectionIndex].section_text}</h4>
      { screenerComplete ? (
        <div>
          <Review />
        </div>
       ) : (
        <div>
          <div>
            <Question
              currentQuestionIndex={currentQuestionIndex}
              currentSectionIndex={currentSectionIndex}
            />
            {
              screener.sections[currentSectionIndex].answer_options.map((answer, index) => (
                <Answer
                  key={index}
                  answer={answer}
                  dataKey={index}
                />
              ))
            }
          </div>
          <div>
            <button onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
       )}
    </>
  );
}

export default Screener;