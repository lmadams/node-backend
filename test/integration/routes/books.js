describe('Rota para livros', () => {
  const Books = app.datasource.models.Books;
  const defaultBook = {
    id: 1,
    name: 'Default Book',
    description: 'Default description',
  };

  beforeEach((done) => {
    Books.destroy({ where: {} })
      .then(() => Books.create(defaultBook))
      .then(() => {
        done();
      });
  });

  describe('Rota GET para /books', () => {
    it('should return a list of books', (done) => {
      request
        .get('/books')
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(defaultBook.id);
          expect(res.body[0].name).to.be.eql(defaultBook.name);
          expect(res.body[0].description).to.be.eql(defaultBook.description);
          done(err);
        });
    });
  });

  describe('Rota GET para /books/{id}', () => {
    it('should return a list a book', (done) => {
      request
        .get('/books/1')
        .end((err, res) => {
          expect(res.body.id).to.be.eql(defaultBook.id);
          expect(res.body.name).to.be.eql(defaultBook.name);
          expect(res.body.description).to.be.eql(defaultBook.description);
          done(err);
        });
    });
  });

  describe('Rota POST para /books', () => {
    it('should create a book', (done) => {
      const newBook = {
        id: 2,
        name: 'new Book',
        description: 'new description of book',
      };

      request
        .post('/books')
        .send(newBook)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(newBook.id);
          expect(res.body.name).to.be.eql(newBook.name);
          expect(res.body.description).to.be.eql(newBook.description);
          done(err);
        });
    });
  });

  describe('Rota PUT para /books/{id}', () => {
    it('should update a book', (done) => {
      const updateBook = {
        id: 1,
        name: 'new Book',
      };

      request
        .put('/books/1')
        .send(updateBook)
        .end((err, res) => {
          expect(res.body).to.be.eql([1]);
          done(err);
        });
    });
  });

  describe('Rota DELETE para /books/{id}', () => {
    it('should delete a book', (done) => {
      request
        .delete('/books/1')
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204);
          done(err);
        });
    });
  });
});
