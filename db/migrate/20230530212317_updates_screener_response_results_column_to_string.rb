class UpdatesScreenerResponseResultsColumnToString < ActiveRecord::Migration[7.0]
  def change
    change_column :screener_responses,
                  :results,
                  :string,
                  array: true,
                  using: "(string_to_array(results, ','))",
                  default: []
  end
end
