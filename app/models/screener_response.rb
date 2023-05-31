# frozen_string_literal: true

class ScreenerResponse < ApplicationRecord
  belongs_to :user
  belongs_to :screener
  has_many :question_responses, dependent: :destroy

  accepts_nested_attributes_for :question_responses

  validates :user, presence: true

  def assess!
    update_domain_scores!
    update_results!
  end

  private

  def update_domain_scores!
    set_running_scores
    total_running_scores

    @running_scores.symbolize_keys!

    update!(
      depression_score: @running_scores[:depression],
      mania_score: @running_scores[:mania],
      anxiety_score: @running_scores[:anxiety],
      substance_use_score: @running_scores[:substance_use]
    )
  end

  def update_results!
    results = []
    results << 'ASRM' if send_asrm?
    results << 'PHQ9' if send_phq9?
    results << 'ASSIST' if send_assist?

    update!(results:)
  end

  def set_running_scores
    @running_scores = Hash.new(0)
  end

  def total_running_scores
    question_responses.each do |q_response|
      @running_scores[q_response.domain] += q_response.answer
    end
  end

  def send_phq9?
    depression_score >= 2 || anxiety_score >= 2
  end

  def send_asrm?
    mania_score >= 2
  end

  def send_assist?
    substance_use_score >= 1
  end
end
