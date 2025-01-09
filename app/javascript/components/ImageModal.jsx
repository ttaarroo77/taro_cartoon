import React from 'react'

const ImageModal = ({ image, onClose, onDelete }) => {
  const handleDelete = async () => {
    if (!confirm('この画像を削除してもよろしいですか？')) return

    try {
      const response = await fetch(`/api/images/${image.id}`, {
        method: 'DELETE',
        headers: {
          'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content
        }
      })

      if (response.ok) {
        onDelete(image.id)
        onClose()
      }
    } catch (error) {
      console.error('Failed to delete image:', error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-dark-800 p-6 rounded-lg max-w-3xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">{image.prompt}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        <img
          src={image.image_url}
          alt={image.prompt}
          className="w-full rounded-lg mb-4"
        />
        <div className="flex justify-between items-center">
          <p className="text-gray-400">
            作成日: {new Date(image.created_at).toLocaleString()}
          </p>
          <div className="space-x-4">
            <button
              onClick={() => window.open(image.image_url, '_blank')}
              className="bg-accent-600 hover:bg-accent-700 text-white px-4 py-2 rounded"
            >
              ダウンロード
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              削除
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageModal 