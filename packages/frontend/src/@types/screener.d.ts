import { Dispatch, SetStateAction } from 'react';
import { IPatientResponse } from './patientResponse';
import { ISection } from './section';

export interface IScreener {
  screener_id: number;
  name: string;
  full_name: string;
  sections: ISection[];
}

export type ScreenerContextType = {
  screener: IScreener | null;
  setScreener: Dispatch<SetStateAction<IScreener>> ;
  answerValue: number | null;
  setAnswerValue: Dispatch<SetStateAction<number | null>>;
  patientResponse: IPatientResponse | null;
  setPatientResponse: Dispatch<SetStateAction<IPatientResponse>>;
  appendPatientResponse: (question_id: string, value: number) => void;
};
