module Api
  module V1
    class ScreenersController < Api::V1::BaseController
      def list
        @screeners = Screener.all
        respond_to do |format|
          format.json
        end
      end

      def show
        @screener = Screener.find(params[:id])
        respond_to do |format|
          format.json
        end
      end
    end
  end
end
