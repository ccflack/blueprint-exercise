import { FormEvent, useContext } from 'react';
import { IAnswerOption } from '../../@types/answeOption';
import { ScreenerContext } from '../../context/screenerContext';
import { ScreenerContextType } from '../../@types/screener';

type AnswerProps = {
  answer: IAnswerOption;
  dataKey: number;
}

function Answer (props: AnswerProps) {
  const { answer, dataKey } = props;
  const { answerValue, setAnswerValue } = useContext(ScreenerContext) as ScreenerContextType;

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setAnswerValue(+e.currentTarget.value);
  }

  return (
    <>
      <input
        id={`${dataKey}`}
        type="radio"
        value={answer.value}
        checked={answerValue === answer.value}
        onChange={onChange}
      />
      <label htmlFor={`${dataKey}`}>{answer.title}</label>
    </>
  );
}

export default Answer;