import BooksController from '../../../controllers/books';

describe('Controllers: Books', () => {
  describe('Get all books: getAll()', () => {
    it('should return a list of books', () => {
      const Books = {
        findAll: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        name: 'Test Book',
        created_at: '2016-08-06T23:55:36.692Z',
        updated_at: '2016-08-06T23:55:36.692Z',
      }];

      td.when(Books.findAll({})).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);
      return booksController.getAll()
        .then(response => expect(response.data).to.be.equal(expectedResponse));
    });
  });

  describe('Get book: getByAll()', () => {
    it('should return a books', () => {
      const Books = {
        findOne: td.function(),
      };

      const expectedResponse = {
        id: 1,
        name: 'Test Book',
        created_at: '2016-08-06T23:55:36.692Z',
        updated_at: '2016-08-06T23:55:36.692Z',
      };

      td.when(Books.findOne({ where: { id: 1 } })).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);
      return booksController.getById({ id: 1 })
        .then(response => expect(response.data).to.be.equal(expectedResponse));
    });
  });

  describe('Create a book: create()', () => {
    it('should create a book', () => {
      const Books = {
        create: td.function(),
      };

      const requestBody = {
        name: 'Test Book',
      };

      const expectedResponse = {
        id: 1,
        name: 'Test Book',
        created_at: '2016-08-06T23:55:36.692Z',
        updated_at: '2016-08-06T23:55:36.692Z',
      };

      td.when(Books.create(requestBody)).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);

      return booksController.create(requestBody)
        .then((response) => {
          expect(response.statusCode).to.be.equal(201);
          expect(response.data).to.be.equal(expectedResponse);
        });
    });
  });

  describe('Update a book: update()', () => {
    it('should update an existing book', () => {
      const Books = {
        update: td.function(),
      };

      const requestBody = {
        id: 1,
        name: 'Test Book Update',
      };

      const expectedResponse = {
        id: 1,
        name: 'Test Book Update',
        created_at: '2016-08-06T23:55:36.692Z',
        updated_at: '2016-08-06T23:55:36.692Z',
      };

      td.when(Books.update(requestBody, { where: { id: 1 } })).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);

      return booksController.update(requestBody, { id: 1 })
        .then(response => expect(response.data).to.be.equal(expectedResponse));
    });
  });

  describe('Delete a book: delete()', () => {
    it('should remove an existing book', () => {
      const Books = {
        destroy: td.function(),
      };

      td.when(Books.destroy({ where: { id: 1 } })).thenResolve({});

      const booksController = new BooksController(Books);

      return booksController.delete({ id: 1 })
        .then(response => expect(response.statusCode).to.be.equal(204));
    });
  });
});
