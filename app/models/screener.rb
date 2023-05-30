class Screener < ApplicationRecord
  has_one :content, dependent: :destroy
  validates :name, presence: true

  accepts_nested_attributes_for :content, allow_destroy: true
end
