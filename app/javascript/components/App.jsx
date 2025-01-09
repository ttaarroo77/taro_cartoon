import React, { useState } from 'react'
import Sidebar from './Sidebar'
import PromptForm from './PromptForm'
import PreviewArea from './PreviewArea'
import LibraryView from './LibraryView'

const App = () => {
  const [currentImage, setCurrentImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentView, setCurrentView] = useState('generator')

  const handleGenerate = async (prompt) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content
        },
        body: JSON.stringify({ prompt })
      })

      const data = await response.json()
      
      if (response.ok) {
        setCurrentImage(data)
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError('エラーが発生しました')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-dark-900">
      <Sidebar onNavigate={setCurrentView} currentView={currentView} />
      
      <main className="flex-1 ml-64 p-8">
        {currentView === 'generator' ? (
          <div>
            <h1 className="text-3xl font-bold mb-8 text-white">らくがき画像を生成</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <PromptForm onSubmit={handleGenerate} isLoading={isLoading} />
              <PreviewArea 
                image={currentImage} 
                onRegenerate={() => handleGenerate(currentImage?.prompt)}
                isLoading={isLoading}
              />
            </div>
          </div>
        ) : (
          <LibraryView onImageSelect={(image) => {
            setCurrentImage(image)
            setCurrentView('generator')
          }} />
        )}
      </main>
    </div>
  )
}

export default App