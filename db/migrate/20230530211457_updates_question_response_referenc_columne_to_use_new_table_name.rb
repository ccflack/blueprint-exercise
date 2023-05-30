class UpdatesQuestionResponseReferencColumneToUseNewTableName < ActiveRecord::Migration[7.0]
  def change
    rename_column :question_responses, :response_id, :screener_response_id
  end
end
