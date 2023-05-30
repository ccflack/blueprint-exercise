class ApplicationController < ActionController::Base
  private

  def current_user
    # Stubbed out with dummy user for now, as there's no need fo user auth in project specs
    @current_user ||= User.find_or_initialize_by(name: 'Test User')
  end
end
