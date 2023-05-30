class RenamesResponsesToScreenerResponses < ActiveRecord::Migration[7.0]
  def change
    rename_table :responses, :screener_responses
  end
end
