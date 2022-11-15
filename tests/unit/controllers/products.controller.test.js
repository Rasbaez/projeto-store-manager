const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);


const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.contoller');
const { products, product, requestNewProduct, newProduct } = require('./mock/products.controller.mock');

describe('Testes da camada Controller', () => {
  describe('Testes unitários', () => { 
    afterEach(sinon.restore);

    describe('Testes da função "getProducts"', () => { 
      it('Caso sucesso deve retornar a lista de todos os produtos cadastrados.', async () => { 
        const req = {};
        const res = products
        
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

       
        sinon.stub(productsService, 'getProducts').resolves({ message: products });

        
        await productsController.getProducts(req, res);
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(products);
      });
    });

    describe('Testando a função getById', () => { 
      it('A função deve listar o produto pelo Id solicitado', async () => { 
        const req = {params: { id: 3 }, body: { }};
        const res = product;

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();


        sinon.stub(productsService, 'getById').resolves({ message: product });

        await productsController.getById(req, res);
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(product);
      });


      it('Em caso de falha, deve retornar o status 404, e a mensagem "Product not found"', async () => { 
        const req = { params: { id: 5 }, body: { } };
        const res = { };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsService, 'getById').resolves(
          { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      
        await productsController.getById(req, res);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith({ message: 'Product not found' });

      });
    });

    describe('Testando a função createProduct', () => { 
      it('Em caso de sucesso deve retornar o novo produto cadastrado.', async  () => { 
        const req = { body: requestNewProduct  };
        const res = {  };

        res.status = sinon.stub().returns(res)
        res.json = sinon.stub().returns();

        sinon.stub(productsService, 'createProduct').resolves({ type: null, message: newProduct })
        await productsController.createProduct(req, res);

        expect(res.status).to.have.been.calledWith(201);
        expect(res.json).to.have.been.calledWith( newProduct );
      });
    });
  });
 });
