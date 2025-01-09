class CreateGeneratedImages < ActiveRecord::Migration[8.0]
  def change
    create_table :generated_images do |t|
      t.string :prompt, null: false
      t.string :image_url, null: false
      t.string :thumbnail_url, null: false

      t.timestamps
    end
  end
end
