import { FormEvent, useContext } from 'react';
import { IAnswerOption } from '../../@types/answeOption';
import { ScreenerContext } from '../../context/screenerContext';
import { ScreenerContextType } from '../../@types/screener';

import { Box, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

type AnswersProps = {
  answerOptions: IAnswerOption[];
}

function Answer (props: AnswersProps) {
  const { answerOptions } = props;
  const { answerValue, setAnswerValue } = useContext(ScreenerContext) as ScreenerContextType;

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setAnswerValue(+e.currentTarget.value);
  }

  return (
    <>
      <FormControl margin='dense' fullWidth component="fieldset">
        <RadioGroup value={answerValue} row onChange={onChange}>
          <Box width="100%" display="flex" justifyContent="space-around">
          {answerOptions.map((answer, index) => (
            <FormControlLabel
              key={index}
              value={answer.value}
              control={<Radio />}
              label={answer.title}
              labelPlacement="bottom"
            />
          ))}
          </Box>
        </RadioGroup>
      </FormControl>

    </>
  );
}

export default Answer;
