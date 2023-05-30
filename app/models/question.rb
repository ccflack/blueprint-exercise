class Question < ApplicationRecord
  has_and_belongs_to_many :sections, join_table: :sections_questions
  has_many :question_responses

  enum domain: {
    depression: 0,
    mania: 1,
    anxiety: 2,
    substance_use: 3
  }

  validates :question_id, presence: true
  validates :title, presence: true
  validates :domain, presence: true, inclusion: { in: domains.keys }
end
