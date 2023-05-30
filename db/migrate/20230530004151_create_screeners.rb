class CreateScreeners < ActiveRecord::Migration[7.0]
  def change
    create_table :screeners do |t|
      t.string :name
      t.string :full_name
      t.string :disorder

      t.timestamps
    end
  end
end
