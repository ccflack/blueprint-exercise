class CreateResponses < ActiveRecord::Migration[7.0]
  def change
    create_table :responses do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :depression_score
      t.integer :mania_score
      t.integer :anxiety_score
      t.integer :substance_use_score
      t.text :results

      t.timestamps
    end
  end
end
