import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ScreenerContext } from "../../context/screenerContext";
import { ScreenerContextType } from "../../@types/screener";
import axios from "axios";

function Review() {
  const navigate = useNavigate();
  const {
    screener,
    patientResponse,
    results,
    setResults
  } = useContext(ScreenerContext) as ScreenerContextType;
  const [submitting, setSubmitting] = useState<boolean>(false);

  const baseURL = "http://localhost:4000";

  const submitPatientResponse = async () => {
    try {
      const resultsData = await axios.post(`${baseURL}/patient-responses`, patientResponse);
      setResults(resultsData.data);
    } catch (error) {
      console.log(error);
    }
  }

  const matchResponse = (questionId: string) => {
    if (!patientResponse) {
      throw new Error('Patient response is not set');
    }

    const answer = patientResponse.answers.find(answer => answer.question_id === questionId);
    return answer?.value;
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setSubmitting(true);
    await submitPatientResponse();
    setSubmitting(false);
    navigate('/results', { replace: false, state: { results } });
  }

  return (
    <div>
      <p>Thank you for completing the screener.</p>
      <p>Review your responses below.</p>
      {screener?.sections.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          <h3>{section.section_text}</h3>
          {section.questions.map((question, questionIndex) => (
            <div key={questionIndex}>
              <h4>{question.question_text}</h4>
              <p>Your response: {matchResponse(question.question_id)}</p>
            </div>
          ))}
        </div>
      ))}
      <p>Click the submit button to submit your responses.</p>
      <button onClick={handleSubmit} disabled={submitting}>
        { submitting ? "Submitting..." : "Submit" }
      </button>
    </div>
  );
}

export default Review;