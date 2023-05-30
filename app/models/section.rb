class Section < ApplicationRecord
  Section.inheritance_column = :_type_disabled

  has_and_belongs_to_many :contents

  has_and_belongs_to_many :answers, join_table: :sections_answers

  has_and_belongs_to_many :questions, join_table: :sections_questions

  validates :title, presence: true
  validates :type, presence: true
end
