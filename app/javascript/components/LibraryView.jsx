import React, { useEffect, useState } from 'react'
import ImageModal from './ImageModal'

const LibraryView = ({ onImageSelect }) => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/images')
        if (response.ok) {
          const data = await response.json()
          setImages(data)
        }
      } catch (error) {
        console.error('Failed to fetch images:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  const handleDelete = (deletedId) => {
    setImages(images.filter(img => img.id !== deletedId))
  }

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse text-gray-300">読み込み中...</div>
      </div>
    )
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-white">保存した画像</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative group cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image.thumbnail_url}
              alt={image.prompt}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-dark-900 bg-opacity-75 text-white p-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-sm truncate">{image.prompt}</p>
              <p className="text-xs text-gray-400">
                {new Date(image.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default LibraryView 