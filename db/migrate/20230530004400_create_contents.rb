class CreateContents < ActiveRecord::Migration[7.0]
  def change
    create_table :contents do |t|
      t.string :display_name
      t.references :screener, null: false, foreign_key: true

      t.timestamps
    end
  end
end
