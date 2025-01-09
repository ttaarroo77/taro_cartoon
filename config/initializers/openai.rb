require 'openai'

OpenAI.configure do |config|
  config.access_token = ENV['OPENAI_API_KEY']
  config.organization_id = ENV['OPENAI_ORGANIZATION_ID'] if ENV['OPENAI_ORGANIZATION_ID']
end 