import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addBook, clearNewBook } from '../../actions';

export class AddBookReview extends PureComponent {
  static propTypes = {
    prop: PropTypes,
  };

  state = {
    formdata: {
      name: '',
      author: '',
      review: '',
      pages: '',
      rating: '',
      price: '',
    },
    error: '',
  };

  handleInput = (event, name) => {
    const newFormdata = {
      ...this.state.formdata,
    };
    newFormdata[name] = event.target.value;

    this.setState({
      formdata: newFormdata,
    });
  };

  submitForm = (e) => {
    e.preventDefault();
    this.setState({ error: '' });

    this.props.dispatch(
      addBook({
        ...this.state.formdata,
        ownerId: this.props.user.login.id,
      })
    );
  };

  showNewBook = (book) => {
    // debugger;
    return book.post ? (
      <div className="conf_link">
        Cool !! Merci...{' '}
        <Link to={`/books/${book.bookId}`}>Click the link to see the post</Link>
      </div>
    ) : null;
  };

  componentWillUnmount() {
    this.props.dispatch(clearNewBook());
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.books.newbook) {
      if (!nextProps.books.newbook.post) {
        if (nextProps.books.newbook.message) {
          this.setState({ error: nextProps.books.newbook.message });
        }
        // else {
        //   this.setState({ error: 'Error,try again.' });
        // }
      }
    }
  }

  render() {
    return (
      <div className="rl_container article">
        <form onSubmit={this.submitForm}>
          <h2>Add a review</h2>

          <div className="form_element">
            <input
              type="text"
              placeholder="Enter name"
              value={this.state.formdata.name}
              onChange={(event) => this.handleInput(event, 'name')}
            />
          </div>

          <div className="form_element">
            <input
              type="text"
              placeholder="Enter author"
              value={this.state.formdata.author}
              onChange={(event) => this.handleInput(event, 'author')}
            />
          </div>

          <textarea
            placeholder="Enter your review"
            value={this.state.formdata.review}
            onChange={(event) => this.handleInput(event, 'review')}
          />

          <div className="form_element">
            <input
              type="number"
              placeholder="Enter pages"
              value={this.state.formdata.pages}
              onChange={(event) => this.handleInput(event, 'pages')}
            />
          </div>

          <div className="form_element">
            <select
              value={this.state.formdata.rating}
              onChange={(event) => this.handleInput(event, 'rating')}
            >
              <option value="" selected disabled hidden>
                Select an Option
              </option>
              <option val="1">1</option>
              <option val="2">2</option>
              <option val="3">3</option>
              <option val="4">4</option>
              <option val="5">5</option>
            </select>
          </div>

          <div className="form_element">
            <input
              type="number"
              placeholder="Enter Price"
              value={this.state.formdata.price}
              onChange={(event) => this.handleInput(event, 'price')}
            />
          </div>

          <button type="submit">Add review</button>

          <div className="error"> {this.state.error}</div>

          {this.props.books.newbook
            ? this.showNewBook(this.props.books.newbook)
            : null}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  books: state.books,
});

export default connect(mapStateToProps)(AddBookReview);
