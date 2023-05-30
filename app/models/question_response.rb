class QuestionResponse < ApplicationRecord
  belongs_to :question
  belongs_to :response
  has_one :user, through: :response

  enum answer: {
    not_at_all: 0,
    several_days: 1,
    more_than_half_the_days: 2,
    nearly_every_day: 3
  }

  validates :answer, presence: true, inclusion: { in: answers.keys }

  def human_answer
    answer.humanize
  end
end
