# frozen_string_literal: true

class Api::V1::ApplicationController < Api::ApplicationController
  def build_meta_users(collection)
    {
      count: collection.count
    }
  end
end
