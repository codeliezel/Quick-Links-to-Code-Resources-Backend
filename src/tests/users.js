import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { users } from '../database/models/index';
import index from '../index';
import { signUp, updateUserDetails } from '../controllers';

const login = {
  email: 'ToluOlakunle@gmail.com',
  password: 'tolukunle.5H',
};

const login1 = {
  email: 'toluufalade@gmail.com',
  password: 'toluufalade.5H',
};
chai.use(sinonChai);
const { expect } = chai;

chai.use(chaiHttp);

let request;
describe(' EXAMPLE, GET / POST / PATCH /DELETE', () => {
  it('should handle invalid routes', (done) => {
    chai.request(index)
      .get('/noRoute')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.be.equal(404);
        expect(res).to.have.status('404');
        done();
      });
  });
  it('should get the base route', (done) => {
    chai.request(index)
      .get('/')
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res).to.have.status('200');
        done();
      });
  });
});
describe('Test for User Endpoints', () => {
  before(async () => {
    request = chai.request(index).keepOpen();
  });
  afterEach(() => sinon.restore());
  after(() => request.close());
  describe('TEST user sign up endpoints ', () => {
    it('Should sign up a new user', async () => {
      const account = {
        firstName: 'Tolu',
        lastName: 'Olakunle',
        email: 'ToluOlakunle@gmail.com',
        password: 'tolukunle.5H',
        phoneNumber: '079887457777',
        userName: 'Tolkul5',
      };
      const req = {
        body: account,
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(users, 'create').returns(true);

      await signUp(req, res);
      expect(res.status).to.have.been.calledWith(201);
    });
    it('should return an error for an already existing email', (done) => {
      chai.request(index)
        .post('/api/v1/user/signup')
        .set('Accept', 'application/json')
        .send({
          firstName: 'Tolu',
          lastName: 'Olakunle',
          email: 'ToluOlakunle@gmail.com',
          password: 'tolukunle.5H',
          phoneNumber: '079887457777',
          userName: 'Tolkul5',
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(409);
          expect(res).to.have.status('409');
          expect(res.body.error).to.be.equal('This email exists already.');
          done();
        });
    });
    it('fake a server error for user sign up', async () => {
      const account = {
        firstName: 'deleee',
      };
      const req = {
        body: account,
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(users, 'create').throws();

      await signUp(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
    it('should sign in a user', (done) => {
      chai.request(index)
        .post('/api/v1/user/signin')
        .set('Accept', 'application/json')
        .send({
          email: 'ToluOlakunle@gmail.com',
          password: 'tolukunle.5H',
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res).to.have.status('200');
          done();
        });
    });
    it('return a server error when trying to sign in', async () => {
    //   const resource = {
    //     email: faker.internet.email(),
    //     password: faker.internet.password(),
    //   };
    //   const req = {
    //     body: resource,
    //   };
    //   const res = {
    //     status: () => { },
    //     json: () => { },
    //   };
    //   sinon.stub(res, 'status').returnsThis();
    //   sinon.stub(users, 'findOne').throws();

      //   await signIn(req, res);
      //   expect(res.status).to.have.been.calledWith(500);
      // });
      it('should return an incorrect email', (done) => {
        chai.request(index)
          .post('/api/v1/user/signin')
          .set('Accept', 'application/json')
          .send({
            email: 'ToluOlakunleeeeee@gmail.com',
            password: 'tolukunle.5H',
          })
          .end((err, res) => {
            expect(res.status).to.be.equal(401);
            expect(res).to.have.status('401');
            done();
          });
      });
      it('should return an incorrect password', (done) => {
        chai.request(index)
          .post('/api/v1/user/signin')
          .set('Accept', 'application/json')
          .send({
            email: 'ToluOlakunle@gmail.com',
            password: 'tolukunle.5Huuuuuu',
          })
          .end((err, res) => {
            expect(res.status).to.be.equal(401);
            expect(res).to.have.status('401');
            done();
          });
      });
    });

    // test for user settings
    describe('TEST USER SETTINGS', () => {
      it('should update user details', (done) => {
        chai.request(index)
          .post('/api/v1/user/signin')
          .set('Accept', 'application/json')
          .send(login1)
          .end((logError, logResponse) => {
            const token = `Bearer ${logResponse.body.token}`;
            chai.request(index)
              .patch('/api/v1/user/settings/59e890f0-71e3-11ea-a7ec-6b46a1daaecf')
              .set('Authorization', token)
              .send({
                userName: 'Tolkul5',
                firstName: 'Tolu',
                lastName: 'Olakunle',
                phoneNumber: '079887457777',
              })
              .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res).to.have.status('200');
                done();
              });
          });
      });
      it('return server error when updating user details', (done) => {
        chai.request(index)
          .patch('/api/v1/user/settings/59e890f0-71e3-11ea-a7ec-6b46a1daaecf')
          .send({
            userName: 'Tolkul5',
            firstName: 'Tolu',
            lastName: 'Olakunle',
            phoneNumber: '079887457777',
          })
          .end((err, res) => {
            expect(res.status).to.be.equal(500);
            expect(res).to.have.status('500');
            done();
          });
      });
      it('should return an access denied error when updating user details', (done) => {
        chai.request(index)
          .post('/api/v1/user/signin')
          .set('Accept', 'application/json')
          .send(login)
          .end((logError, logResponse) => {
            const token = `Bearer ${logResponse.body.token}`;
            chai.request(index)
              .patch('/api/v1/user/settings/9482ab40-71cc-11ea-b27b-5f64fe9a3bee')
              .set('Authorization', token)
              .send({
                userName: 'toyin1112',
                firstName: 'Tayo',
                lastName: 'ola',
                phoneNumber: '0960876785439',
              })
              .end((err, res) => {
                expect(res.status).to.be.equal(401);
                expect(res).to.have.status('401');
                done();
              });
          });
      });
      it('fake a server error for user user update details', async () => {
        const account = {
          userName: 'toyin1112',
          firstName: 'Tayo',
          lastName: 'ola',
          phoneNumber: '0960876785439',
        };
        const req = {
          body: account,
        };
        const res = {
          status: () => { },
          json: () => { },
        };
        sinon.stub(res, 'status').returnsThis();
        sinon.stub(users, 'update').throws();

        await updateUserDetails(req, res);
        expect(res.status).to.have.been.calledWith(500);
      });
    });
  });
});
