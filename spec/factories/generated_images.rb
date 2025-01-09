FactoryBot.define do
  factory :generated_image do
    prompt { Faker::Lorem.sentence }
    image_url { Faker::Internet.url(host: 'example.com', path: '/images/1.jpg') }
    thumbnail_url { Faker::Internet.url(host: 'example.com', path: '/thumbnails/1.jpg') }
  end
end 