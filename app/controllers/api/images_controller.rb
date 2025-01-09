class Api::ImagesController < ApplicationController
  def create
    result = ImageGenerationService.call(params[:prompt])
    
    if result.success?
      render json: {
        id: result.image.id,
        prompt: result.image.prompt,
        image_url: result.image.image_url,
        thumbnail_url: result.image.thumbnail_url,
        created_at: result.image.created_at
      }, status: :created
    else
      render json: { error: result.error }, status: :unprocessable_entity
    end
  end

  def index
    images = GeneratedImage.order(created_at: :desc).limit(20)
    render json: images.map { |image|
      {
        id: image.id,
        prompt: image.prompt,
        image_url: image.image_url,
        thumbnail_url: image.thumbnail_url,
        created_at: image.created_at
      }
    }
  end

  def regenerate
    result = ImageGenerationService.call(params[:prompt])
    
    if result.success?
      render json: {
        image_url: result.image_url,
        thumbnail_url: result.thumbnail_url,
        prompt: params[:prompt]
      }
    else
      render json: { error: result.error }, status: :unprocessable_entity
    end
  end

  def destroy
    image = GeneratedImage.find(params[:id])
    if image.destroy
      head :no_content
    else
      render json: { error: '削除に失敗しました' }, status: :unprocessable_entity
    end
  end
end 