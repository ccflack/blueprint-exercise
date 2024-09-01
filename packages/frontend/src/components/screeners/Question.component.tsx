import { useContext } from "react";
import { ScreenerContext } from "../../context/screenerContext";
import { ScreenerContextType } from "../../@types/screener";

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
      {<h3>{currentQuestion?.question_text}</h3>}
    </>
  );
}

export default Question;