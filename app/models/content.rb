class Content < ApplicationRecord
  belongs_to :screener
  has_and_belongs_to_many :sections

  validates :screener, presence: true
  validates :display_name, presence: true
end
