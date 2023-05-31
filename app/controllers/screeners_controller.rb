class ScreenersController < ApplicationController
  before_action :find_screener, only: [:show]

  def index
    @screeners = Screener.all
  end

  def show
    @screener = Screener.find(screener_params)
  end

  def follow_up
    @follow_up_results = ScreenerResponse.find(screener_response_params).results
  end

  private

  def find_screener
    @screener = Screener.find(screener_params)
  end

  def screener_params
    params.require(:id)
  end

  def screener_response_params
    params.require(:screener_response_id)
  end
end
