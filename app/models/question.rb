class Question < ApplicationRecord
  belongs_to :survey
  has_many :question_responses, dependent: :nullify

  enum question_id: {
    question_a: 0,
    question_b: 1,
    question_c: 2,
    question_d: 3,
    question_e: 4,
    question_f: 5,
    question_g: 6,
    question_h: 7
  }

  enum domain: {
    depression: 0,
    mania: 1,
    anxiety: 2,
    substance_use: 3
  }

  validates :question_id, presence: true, inclusion: { in: question_ids.keys }
  validates :domain, presence: true, inclusion: { in: domains.keys }
end
