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
      const booksList = Joi.array().items(Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      }));

      request
        .get('/books')
        .end((err, res) => {
          joiAssert(res.body, booksList);
          done(err);
        });
    });
  });

  describe('Rota GET para /books/{id}', () => {
    it('should return a list a book', (done) => {
      const book = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      });


      request
        .get('/books/1')
        .end((err, res) => {
          joiAssert(res.body, book);
          done(err);
        });
    });
  });

  describe('Rota POST para /books', () => {
    it('should create a book', (done) => {
      const newBook = {
        id: 2,
        name: 'new Book',
        description: 'new description',
      };

      const book = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      });

      request
        .post('/books')
        .send(newBook)
        .end((err, res) => {
          joiAssert(res.body, book);
          done(err);
        });
    });
  });

  describe('Rota PUT para /books/{id}', () => {
    it('should update a book', (done) => {
      const updateBook = {
        id: 1,
        name: 'new Book',
        description: 'update description',
      };
      const updateCount = Joi.array().items(1);

      request
        .put('/books/1')
        .send(updateBook)
        .end((err, res) => {
          joiAssert(res.body, updateCount);
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
