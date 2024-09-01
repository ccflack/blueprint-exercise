import { useLocation } from "react-router-dom";

function ResultsPage() {
  const location = useLocation();
  const results = location.state.results;

  return (
    <div>
      <h1>Thank you!</h1>
      {
        results.length > 0 ? (
          <p>
            Based on your results, further assessments may be recommended by your provider. Please complete:
            <ul>
              {results.map((result: any, index: number) => (
                <li key={index}>{result.assessment}</li>
              ))}
            </ul>
          </p>
        ) : (
          <p>
            Based on your results, no further assessments are recommended at this time. Your provider will be in contact.
          </p>
        )
      }
    </div>
  );
}

export default ResultsPage;