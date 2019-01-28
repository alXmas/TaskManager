module SignInHelper
  def sign_in_as(admin)
    post session_path, params: { session: {password: admin.password, email: admin.email} }
  end
end