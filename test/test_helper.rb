ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

Dir['./test/helpers/**/*.rb'].sort.each { |f| require f }

class ActiveSupport::TestCase
  include FactoryBot::Syntax::Methods
  include Concerns::AuthHelper
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
end

class ActionDispatch::IntegrationTest
  include SignInHelper
end