export interface IPatientResponse {
  screener_id: number | null ;
  answers: {
    question_id: string;
    value: number;
  }[]
};