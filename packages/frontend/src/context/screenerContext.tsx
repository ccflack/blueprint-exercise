import { FC, ReactNode, createContext, useState } from "react";
import { IScreener, ScreenerContextType } from "../@types/screener";
import { IPatientResponse } from "../@types/patientResponse";

export const ScreenerContext = createContext<ScreenerContextType | null>(null);

const initialScreener = {
  screener_id: 0,
  name: '',
  full_name: '',
  sections: [],
} as IScreener;

const initialPatientResponse = {
  screener_id: 0,
  answers: []
} as IPatientResponse;

const ScreenerProvider: FC<{children: ReactNode}> = ({children}) => {
  const [screener, setScreener] = useState<IScreener>(initialScreener);
  const [answerValue, setAnswerValue] = useState<number | null>(null);
  const [patientResponse, setPatientResponse] = useState<IPatientResponse>(initialPatientResponse);

  const appendPatientResponse = (question_id: string, value: number) => {
    if (screener.screener_id === 0) {
      throw new Error('Screener ID is not set');
    }

    if (patientResponse.screener_id === 0) {
      setPatientResponse({
        screener_id: screener.screener_id,
        answers: [{ question_id, value }]
      });
    } else {
      setPatientResponse(prevState => ({
        screener_id: prevState.screener_id,
        answers: [ ...prevState.answers, { question_id, value } ]
      }));
    }
    setAnswerValue(null);
  }

  return (
    <ScreenerContext.Provider value={{
      screener,
      setScreener,
      answerValue,
      setAnswerValue,
      patientResponse,
      setPatientResponse,
      appendPatientResponse,
    }}>
      {children}
    </ScreenerContext.Provider>
  );
}

export default ScreenerProvider;