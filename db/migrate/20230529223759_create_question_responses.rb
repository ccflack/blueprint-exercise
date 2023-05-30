class CreateQuestionResponses < ActiveRecord::Migration[7.0]
  def change
    create_table :question_responses do |t|
      t.references :response, null: false, foreign_key: true
      t.references :question, null: false, foreign_key: true
      t.integer :answer

      t.timestamps
    end
  end
end
