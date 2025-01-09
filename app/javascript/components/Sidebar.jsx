import React from 'react'

const Sidebar = ({ onNavigate, currentView }) => {
  return (
    <div className="w-64 bg-dark-800 h-screen shadow-lg fixed left-0 top-0">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-white mb-8">らくがきカラー</h1>
        <nav>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => onNavigate('generator')}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  currentView === 'generator' 
                    ? 'bg-accent-600 text-white' 
                    : 'text-gray-300 hover:bg-dark-700'
                }`}
              >
                画像生成
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('library')}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  currentView === 'library' 
                    ? 'bg-accent-600 text-white' 
                    : 'text-gray-300 hover:bg-dark-700'
                }`}
              >
                ライブラリ
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar 