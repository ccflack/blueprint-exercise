class Answer < ApplicationRecord
  has_and_belongs_to_many :sections, join_table: :sections_answers

  validates :title, presence: true
  validates :value, presence: true
end
