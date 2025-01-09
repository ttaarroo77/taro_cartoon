import React, { useEffect, useState } from 'react'

const LibraryList = ({ onImageSelect }) => {
  const [images, setImages] = useState([])

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
      }
    }

    fetchImages()
  }, [])

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">最近生成した画像</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            onClick={() => onImageSelect(image)}
            className="cursor-pointer hover:opacity-75 transition-opacity"
          >
            <img
              src={image.thumbnail_url}
              alt={image.prompt}
              className="w-full h-auto rounded"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default LibraryList 