class CreatesSectionsQuestions < ActiveRecord::Migration[7.0]
  def change
    create_join_table(:sections, :questions, table_name: :sections_questions) do |t|
      t.index :section_id
      t.index :question_id
    end
  end
end
