Rails.application.routes.draw do
  namespace :api do
    resources :images, only: [:create, :index, :destroy]
  end
  
  root 'home#index'
end
