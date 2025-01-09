import React from 'react'

const PreviewArea = ({ image, onRegenerate, isLoading }) => {
  const handleDownload = () => {
    if (image?.image_url) {
      window.open(image.image_url, '_blank')
    }
  }

  return (
    <div className="p-4 bg-dark-800 rounded-lg shadow">
      <div className="mb-4 relative">
        {isLoading ? (
          <div className="w-full h-64 bg-dark-700 rounded flex flex-col items-center justify-center">
            <div className="animate-pulse text-gray-300 mb-4">
              画像を生成中...
            </div>
            <div className="w-64 h-2 bg-dark-600 rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent-500 rounded-full animate-progress"
                style={{
                  width: '100%',
                  animation: 'progress 15s linear'
                }}
              />
            </div>
            <div className="text-sm text-gray-400 mt-2">
              約15秒かかります
            </div>
          </div>
        ) : image ? (
          <img
            src={image.image_url}
            alt="生成された線画"
            className="w-full h-auto rounded"
          />
        ) : (
          <div className="w-full h-64 bg-dark-700 rounded flex items-center justify-center">
            <p className="text-gray-400">ここに生成された画像が表示されます</p>
          </div>
        )}
      </div>
      
      {image && !isLoading && (
        <div className="flex space-x-4">
          <button
            onClick={handleDownload}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            ダウンロード
          </button>
          <button
            onClick={onRegenerate}
            className="flex-1 bg-accent-600 hover:bg-accent-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            再生成
          </button>
        </div>
      )}
    </div>
  )
}

export default PreviewArea 