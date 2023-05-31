# frozen_string_literal: true

require 'rails_helper'

RSpec.describe "ScreenerResponses", type: :request do
  let!(:user) { create(:user) }
  let(:answers_payload) do
    [
      {
        "value": 1,
        "question_id": "question_a"
      },
      {
        "value": 0,
        "question_id": "question_b"
      },
      {
        "value": 2,
        "question_id": "question_c"
      },
      {
        "value": 3,
        "question_id": "question_d"
      },
      {
        "value": 1,
        "question_id": "question_e"
      },
      {
        "value": 0,
        "question_id": "question_f"
      },
      {
        "value": 1,
        "question_id": "question_g"
      },
      {
        "value": 0,
        "question_id": "question_h"
      }
    ]
  end

  describe "POST /assess" do
    before(:all) do
      load "#{Rails.root}/db/seeds/sample_screener_seed.rb"
    end

    after(:all) do
      DatabaseCleaner.clean
    end

    it "returns a results array" do
      post "/api/v1/screener_responses/assess",
           params: {
             screener_id: -1, # We hardcode this sample screener's id to -1 in the seeds file
             answers: answers_payload
           }


      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)['results']).to eq(["ASRM", "PHQ9"])
    end
  end
end
