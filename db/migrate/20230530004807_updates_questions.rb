
class UpdatesQuestions < ActiveRecord::Migration[7.0]
  def change
    rename_column :questions, :text, :title
  end
end
