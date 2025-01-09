class GeneratedImage < ApplicationRecord
  validates :prompt, presence: true
  validates :image_url, presence: true
  validates :thumbnail_url, presence: true
end
