import { fetch } from "./Fetch";

export function getCard(cardId) {
  const path = window.Routes.api_v1_task_path(cardId, { format: "json" });

  return fetch("GET", path);
}

export function updateCard(cardId, parmas) {
  const path = window.Routes.api_v1_task_path(cardId, { format: "json" });

  return fetch("PUT", path, parmas);
}

export function deleteCard(cardId) {
  const path = window.Routes.api_v1_task_path(cardId, { format: "json" });

  return fetch("DELETE", path);
}

export function createCard(parmas) {
  fetch("POST", window.Routes.api_v1_tasks_path(), parmas);
}

export function getLine(state, page) {
  const params = {
    q: { state_eq: state },
    page: page,
    per_page: 10,
    format: "json"
  };
  const path = window.Routes.api_v1_tasks_path(params);

  return fetch("GET", path);
}

export function getLoad(inputValue) {
  const params = {
    q: { first_name_or_last_name_cont: inputValue },
    format: "json"
  };
  const path = window.Routes.api_v1_users_path(params);
  return fetch("GET", path);
}
