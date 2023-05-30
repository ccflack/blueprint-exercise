class User < ApplicationRecord
  has_many :screener_responses, dependent: :destroy
end
