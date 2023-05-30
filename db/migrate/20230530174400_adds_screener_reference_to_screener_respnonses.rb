class AddsScreenerReferenceToScreenerRespnonses < ActiveRecord::Migration[7.0]
  def change
    add_reference :screener_responses, :screener, null: false, foreign_key: true
  end
end
