class Task < ApplicationRecord
  include StateMachines::TaskStateMachine

  belongs_to :author, class_name: "User"
  belongs_to :assignee, class_name: "User", optional: true

  validates :name, presence: true
  validates :description, presence: true
  validates :author, presence: true
  validates :description, length: { maximum: 500 }
end
