class Admin::ApplicationController < ApplicationController
  include Concerns::AuthHelper

  helper_method :current_user

  before_action :authorize

  def authorize
    authenticate_user!

    if (forbidden?)
      render(:file => File.join(Rails.root, 'public/403.html'), :status => 403, :layout => false)
    end
  end

  def forbidden?
    !current_user.is_a? Admin
  end
end