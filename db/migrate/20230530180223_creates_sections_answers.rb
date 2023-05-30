class CreatesSectionsAnswers < ActiveRecord::Migration[7.0]
  def change
    create_join_table(:sections, :answers, table_name: :sections_answers) do |t|
      t.index :section_id
      t.index :answer_id
    end
  end
end
