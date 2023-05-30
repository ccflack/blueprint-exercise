class ChangesQuestionsQuestionIdToString < ActiveRecord::Migration[7.0]
  def change
    change_column :questions, :question_id, :string
  end
end
