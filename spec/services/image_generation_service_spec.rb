require 'rails_helper'

RSpec.describe ImageGenerationService do
  describe '.call' do
    let(:prompt) { 'test elephant' }
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

    it 'generates an image successfully' do
      result = described_class.call(prompt)
      expect(result.success?).to be true
      expect(result.image).to be_a(GeneratedImage)
      expect(result.image.prompt).to eq(prompt)
    end

    context 'when AI service fails' do
      before do
        allow_any_instance_of(OpenAI::Client).to receive(:images)
          .and_raise(StandardError.new('API error'))
      end

      it 'returns error result' do
        result = described_class.call(prompt)
        expect(result.success?).to be false
        expect(result.error).to include('エラーが発生しました')
      end
    end

    context 'when AI response is invalid' do
      let(:mock_response) { { 'data' => [] } }

      it 'returns error result' do
        result = described_class.call(prompt)
        expect(result.success?).to be false
        expect(result.error).to eq('画像の生成に失敗しました')
      end
    end
  end
end 