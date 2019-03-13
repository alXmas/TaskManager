require 'rollbar'

Rollbar.configure do |config|
  config.access_token = '592c32d905104a5f8c590a92b4c2fabe'

  if Rails.env.test?
    config.enabled = false
  end

  config.environment = ENV['ROLLBAR_ENV'].presence || Rails.env
end