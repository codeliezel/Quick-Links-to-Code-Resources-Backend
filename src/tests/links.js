import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { links } from '../database/models/index';
import index from '../index';
import { deleteLink, getLink, updateLink, getAllLinks,
} from '../controllers/index';
const login = {
  email: 'ToluOlakunle@gmail.com',
  password: 'tolukunle.5H',
};
chai.use(sinonChai);
const { expect } = chai;

chai.use(chaiHttp);
// test for links
let request;
describe('Test for User Endpoints', () => {
  before(async () => {
    request = chai.request(index).keepOpen();
  });
  afterEach(() => sinon.restore());
  after(() => request.close());
  describe('TEST LINKS ENDPOINTS', () => {
    // it('Should add a new link', async () => {
    //   const resource = {s
    //     title: 'how to create a sign up form in react',
    //     author: 'Amanda Lee',
    //     comment: 'This tutorial is all about signing up with a form uisng react and redux.',
    //     tags: 'react, redux, html',
    //     category: 'front-end',
    //     link: 'https://dev.to/cffunmfi5/mingi-carrds-using-algolia-as-the-search-service-and-sebtting-the-wheb-app-up-as-a-pwa-3fan',
    //   };
    //   const req = {
    //     body: resource,
    //   };
    //   const res = {
    //     status: () => { },
    //     json: () => { },
    //   };
    //   sinon.stub(res, 'status').returnsThis();
    //   sinon.stub(links, 'create').returns(true);
  
    //   await addLink(req, res);
    //   expect(res.status).to.have.been.calledWith(201);
    // });
    it('should return an error for duplicate link', (done) => {
      chai.request(index)
        .post('/api/v1/user/signin')
        .set('Accept', 'application/json')
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.token}`;
          chai.request(index)
            .post('/api/v1/link/add')
            .set('Authorization', token)
            .send({
              title: 'how to create a sign up form in react',
              author: 'Amanda Lee',
              comment: 'This tutorial is all about signing up with a form uisng react and redux.',
              tags: 'react, redux, html',
              category: 'front-end',
              link: 'https://dev.to/cffunmfi5/mingi-contacst-cards-using-algolia-as-the-search-service-and-sebtting-the-wheb-app-up-as-a-pwa-3fan',
            })
            .end((err, res) => {
              expect(res.status).to.be.equal(409);
              expect(res).to.have.status('409');
              done();
            });
        });
    });
    it('should get a link', (done) => {
      chai.request(index)
        .get('/api/v1/link/view/0d6d6fb0-71d5-11ea-8fe8-3566f65e5a90')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res).to.have.status('200');
          done();
        });
    });
    it('should return an error when getting a link', (done) => {
      chai.request(index)
        .get('/api/v1/link/view/0003547c-5ace-475b-b26f-321bf0d29f4b')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          expect(res).to.have.status('404');
          done();
        });
    });
    it('Should return a server error when getting a link', async () => {
      const req = {
        params: {
          linkId: '66666666666666666666666',
        },
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(links, 'findById').throws();
      
      await getLink(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
    it('should get all links', (done) => {
      chai.request(index)
        .get('/api/v1/link/view/all')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res).to.have.status('200');
          done();
        });
    });
    it('Should return an error when getting all links', async () => {
      const req = {
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(links, 'find').throws();
      
      await getAllLinks(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
    // it('Should return an error 404 when getting all links', async () => {
    //   const req = {
    //   };
    //   const res = {
    //     status: () => { },
    //     json: () => { },
    //   };
    //   sinon.stub(res, 'status').returnsThis();
    //   sinon.stub(links, 'find').returns([]);
      
    //   await getAllLinks(req, res);
    //   expect(res.status).to.have.been.calledWith(404);
    // });
    it('should update a posted link', (done) => {
      chai.request(index)
        .post('/api/v1/user/signin')
        .set('Accept', 'application/json')
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.token}`;
          chai.request(index)
            .patch('/api/v1/link/update/0d6d6fb0-71d5-11ea-8fe8-3566f65e5a90')
            .set('Authorization', token)
            .send({
              title: 'how to create a sign up form in react',
              author: 'Amanda Lee',
              comment: 'This tutorial is all about signing up with a form uisng react and redux.',
              tags: 'react, redux, html',
              category: 'front-end',
              link: 'https://dev.to/cffunmfi5/mingi-contacst-cards-using-algolia-as-the-search-service-and-sebtting-the-wheb-app-up-as-a-pwa-3fan',
            })
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res).to.have.status('200');
              done();
            });
        });
    });
    it('Should return an error when updating a link', async () => {
      const resource = {
        title: 'how to create a sign up form in react',
        author: 'Amanda Lee',
        comment: 'This tutorial is all about signing up with a form uisng react and redux.',
        tags: 'react, redux, html',
        category: 'front-end',
        link: 'https://dev.to/cffunmfi5/mingi-contacst-cards-using-algolia-as-the-search-service-and-sebtting-the-wheb-app-up-as-a-pwa-3fan',
      };
      const req = {
        body: resource,
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(links, 'findOneAndUpdate').throws();
      
      await updateLink(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
    it('Should delete a link', async () => {
      const req = {
        params: {
          linkId: '9520f900-71ca-11ea-957f-73626d35755e',
        },
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(links, 'findByIdAndDelete').returns(true);
    
      await deleteLink(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });
    it('Should return an error when deleting a link', async () => {
      const req = {
        params: {
          linkId: '0003547c-5ace-475b-b26f-321bf0d29f4b',
        },
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(links, 'findByIdAndDelete').returns(null);
      
      await deleteLink(req, res);
      expect(res.status).to.have.been.calledWith(404);
    });
    it('Should return a server error when deleting a link', async () => {
      const req = {
        params: {
          
        },
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(links, 'findByIdAndDelete').throws();
        
      await deleteLink(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });
});
