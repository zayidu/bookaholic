import axios from 'axios';

export function getBooks(limit = 10, start = 0, order = 'asc', list = '') {
  const request = axios
    .get(`/api/books?skip=${start}&limit=${limit}&order=${order}`)
    .then((response) => {
      if (list) {
        return [...list, ...response.data];
      } else {
        return response.data;
      }
    });

  return {
    type: 'GET_BOOKS',
    payload: request,
  };
}

export function getBookWithReviewer(id) {
  const request = axios.get(`/api/book/${id}`);

  return (dispatch) => {
    request.then(({ data }) => {
      let book = data;

      axios.get(`/api/user/reviewer/${book.ownerId}`).then(({ data }) => {
        let response = { book, reviewer: data };

        dispatch({
          type: 'GET_BOOK_W_REVIEWER',
          payload: response,
        });
      });
    });
  };
}

export function clearBooksWithReviewer() {
  return {
    type: 'CLEAR_BOOK_W_REVIEWER',
    payload: { book: {}, reviewer: {} },
  };
}

export function addBook(book) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(book);

  const request = axios
    .post('/api/book', body, config)
    .then((response) => response.data);

  return {
    type: 'ADD_BOOK',
    payload: request,
  };
}

export function clearNewBook() {
  return {
    type: 'CLEAR_NEWBOOK',
    payload: {},
  };
}

export function getBook(id) {
  const request = axios
    .get(`/api/book/${id}`)
    .then((response) => response.data);

  return {
    type: 'GET_BOOK',
    payload: request,
  };
}

export function updateBook(data) {
  const request = axios
    .post(`/api/book/update`, data)
    .then((response) => response.data);

  return {
    type: 'UPDATE_BOOK',
    payload: request,
  };
}

export function clearBook() {
  return {
    type: 'CLEAR_BOOK',
    payload: {
      book: null,
      updateBook: false,
      postDeleted: false,
    },
  };
}

export function deleteBook(id) {
  const request = axios
    .delete(`/api/book/${id}`)
    .then((response) => response.data);

  return {
    type: 'DELETE_BOOK',
    payload: request,
  };
}
/*=========== User ============*/
export function loginUser({ email, password }) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  const request = axios
    .post('/api/user/login', body, config)
    .then((response) => response.data);

  return {
    type: 'USER_LOGIN',
    payload: request,
  };
}

export function auth() {
  const request = axios.get('/api/auth').then((response) => response.data);

  return {
    type: 'USER_AUTH',
    payload: request,
  };
}

export function getUserPosts(userId) {
  const request = axios
    .get(`/api/user/posts/${userId}`)
    .then((response) => response.data);

  return {
    type: 'GET_USER_POSTS',
    payload: request,
  };
}
