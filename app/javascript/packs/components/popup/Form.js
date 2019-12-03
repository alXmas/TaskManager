const Form = {
  defaultAttributes() {
    return {
      task: {
        id: null,
        name: "",
        description: "",
        state: null,
        assignee: {
          id: null,
          first_name: null,
          last_name: null,
          email: null
        }
      },
      author: {
        id: null,
        first_name: null,
        last_name: null,
        email: null
      },
      isLoading: true
    };
  },
  attributesToSubmit(attributes) {
    const updatedAttributes = {
      name: attributes.name,
      description: attributes.description,
      author_id: attributes.author.id,
      assignee_id: attributes.assignee.id,
      state: attributes.state
    };
    return updatedAttributes;
  }
};

export default Form;
