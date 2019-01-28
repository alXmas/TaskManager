require 'test_helper'

class Web::DevelopersControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get new_developer_path
    assert_response :success
  end

  test "should get create" do
    post developers_path, params: { developer: attributes_for(:developer) }
    assert_response :redirect
  end
end