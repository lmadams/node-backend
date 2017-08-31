describe('Rota para Usuarios', () => {
  const Users = app.datasource.models.Users;
  const defaultUser = {
    id: 1,
    name: 'Default Book',
    email: 'test@mail.com',
    password: 'test',
  };

  beforeEach((done) => {
    Users.destroy({ where: {} })
      .then(() => Users.create(defaultUser))
      .then(() => {
        done();
      });
  });

  describe('Rota GET para /users', () => {
    it('should return a list of users', (done) => {
      request
        .get('/users')
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(defaultUser.id);
          expect(res.body[0].name).to.be.eql(defaultUser.name);
          expect(res.body[0].email).to.be.eql(defaultUser.email);
          // expect(res.body[0].password).to.be.eql(defaultUser.password);
          done(err);
        });
    });
  });

  describe('Rota GET para /users/{id}', () => {
    it('should return a list a user', (done) => {
      request
        .get('/users/1')
        .end((err, res) => {
          expect(res.body.id).to.be.eql(defaultUser.id);
          expect(res.body.name).to.be.eql(defaultUser.name);
          expect(res.body.email).to.be.eql(defaultUser.email);
          done(err);
        });
    });
  });

  describe('Rota POST para /users', () => {
    it('should create a user', (done) => {
      const newUser = {
        id: 2,
        name: 'new user',
        email: 'newuser@mail.com',
        password: 'test',
      };

      request
        .post('/users')
        .send(newUser)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(newUser.id);
          expect(res.body.name).to.be.eql(newUser.name);
          expect(res.body.description).to.be.eql(newUser.description);
          done(err);
        });
    });
  });

  describe('Rota PUT para /users/{id}', () => {
    it('should update a user', (done) => {
      const updateBook = {
        id: 1,
        name: 'new user',
        email: 'newuser@mail.com',
        password: 'test',
      };

      request
        .put('/users/1')
        .send(updateBook)
        .end((err, res) => {
          expect(res.body).to.be.eql([1]);
          done(err);
        });
    });
  });

  describe('Rota DELETE para /users/{id}', () => {
    it('should delete a user', (done) => {
      request
        .delete('/users/1')
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204);
          done(err);
        });
    });
  });
});
