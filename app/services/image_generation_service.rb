require 'openai'
require 'ostruct'

class ImageGenerationService
  def self.call(prompt)
    new(prompt).execute
  end

  def initialize(prompt)
    @prompt = prompt
  end

  def execute
    # プロンプトの加工（線画用のスタイルを追加）
    enhanced_prompt = "#{@prompt}, line drawing, outline, kid's coloring book style, black and white illustration, simple clean lines"

    begin
      client = OpenAI::Client.new
      response = client.images.generate(
        parameters: {
          prompt: enhanced_prompt,
          model: "dall-e-3",
          n: 1,
          size: "1024x1024",
          quality: "standard",
          style: "natural"
        }
      )

      if response.dig("data", 0, "url")
        image_url = response["data"][0]["url"]
        
        # 生成された画像を保存
        generated_image = GeneratedImage.create!(
          prompt: @prompt,
          image_url: image_url,
          thumbnail_url: image_url
        )

        ::OpenStruct.new(
          success?: true,
          image: generated_image,
          image_url: image_url,
          thumbnail_url: image_url
        )
      else
        Rails.logger.error "OpenAI Response: #{response.inspect}"
        ::OpenStruct.new(
          success?: false,
          error: "画像の生成に失敗しました"
        )
      end
    rescue => e
      Rails.logger.error "Error in ImageGenerationService: #{e.message}\n#{e.backtrace.join("\n")}"
      ::OpenStruct.new(
        success?: false,
        error: "エラーが発生しました: #{e.message}"
      )
    end
  end
end 