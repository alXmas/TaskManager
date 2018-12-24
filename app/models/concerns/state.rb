module State
  extend ActiveSupport::Concern

  included do
    state_machine :state, initial: :new_task do
      event :development do
        transition new_task: :in_development
      end
      event :archive do
        transition new_task: :archived
      end
      event :test do
        transition in_development: :in_qa
      end
      event :fail_test do
        transition in_qa: :in_development
      end
      event :pass_test do
        transition in_qa: :in_code_review
      end
      event :pass_review do
        transition in_code_review: :ready_for_release
      end
      event :fail_review do
        transition in_code_review: :in_development
      end
      event :release do
        transition ready_for_release: :released
      end
      event :finish do
        transition released: :archived
      end
    end
  end
end