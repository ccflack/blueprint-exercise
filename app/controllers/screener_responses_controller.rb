class ScreenerResponsesController < ApplicationController
  def assess
    @response = ScreenerResponse.create!(user: current_user, screener_id: screener_params)

    answers_params[:answers].each do |answer|
      question = Question.find_by(question_id: answer[:question_id])
      @response.question_responses.create!(
        answer: answer[:value],
        question: question
      )
    end

    @response.assess!

    render json: { results: @response.results, status: :ok }
  end

  private

  def answers_params
    params.permit(answers: [:value, :question_id])
  end

  def screener_params
    params.require(:screener_id)
  end
end
