Rails.application.routes.draw do
  resources :screeners, only: [:index, :show] do
    collection do
      get :follow_up
    end
  end

  namespace :api do
    namespace :v1 do
      resources :screeners do
        collection do
          post :list
        end
        member do
          post :show
        end
      end

      resources :screener_responses, only: [:create] do
        collection do
          post :assess
        end
      end
    end
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "screeners#index"
end
