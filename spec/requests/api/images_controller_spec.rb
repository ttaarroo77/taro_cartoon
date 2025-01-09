require 'rails_helper'

RSpec.describe Api::ImagesController, type: :request do
  describe 'POST /api/images' do
    let(:valid_params) { { prompt: 'test elephant' } }
    let(:mock_response) do
      {
        'data' => [
          { 'url' => 'https://example.com/image.jpg' }
        ]
      }
    end

    before do
      allow_any_instance_of(OpenAI::Client).to receive(:images)
        .and_return(double(generate: mock_response))
    end

    it 'creates a new image' do
      expect {
        post '/api/images', params: valid_params
      }.to change(GeneratedImage, :count).by(1)

      expect(response).to have_http_status(:created)
      json = JSON.parse(response.body)
      expect(json['image_url']).to be_present
      expect(json['prompt']).to eq('test elephant')
    end

    context 'when AI service fails' do
      before do
        allow_any_instance_of(OpenAI::Client).to receive(:images)
          .and_raise(StandardError.new('API error'))
      end

      it 'returns error status' do
        post '/api/images', params: valid_params
        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON.parse(response.body)
        expect(json['error']).to be_present
      end
    end
  end

  describe 'GET /api/images' do
    before do
      create_list(:generated_image, 3)
    end

    it 'returns a list of images' do
      get '/api/images'
      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json.length).to eq(3)
      expect(json.first).to include('id', 'prompt', 'image_url', 'created_at')
    end
  end

  describe 'DELETE /api/images/:id' do
    let!(:image) { create(:generated_image) }

    it 'deletes the image' do
      expect {
        delete "/api/images/#{image.id}"
      }.to change(GeneratedImage, :count).by(-1)

      expect(response).to have_http_status(:no_content)
    end

    context 'when image does not exist' do
      it 'returns not found status' do
        delete '/api/images/0'
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end 