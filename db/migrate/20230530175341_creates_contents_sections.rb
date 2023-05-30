class CreatesContentsSections < ActiveRecord::Migration[7.0]
  def change
    create_join_table(:contents, :sections, table_name: :contents_sections) do |t|
      t.index :content_id
      t.index :section_id
    end
  end
end
