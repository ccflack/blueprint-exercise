export class CreatePatientResponseDto {
  screener_id: number;
  answers: [{ question_id: string; value: number }];
}
