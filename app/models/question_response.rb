class QuestionResponse < ActiveRecord::Base
  belongs_to :question
  belongs_to :screener_response
  has_one :user, through: :screener_response

  validates :question, presence: true
  validates :screener_response, presence: true

  delegate :domain, to: :question
end
