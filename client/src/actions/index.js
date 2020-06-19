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

export function getBooksWithReviewer(id) {
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
