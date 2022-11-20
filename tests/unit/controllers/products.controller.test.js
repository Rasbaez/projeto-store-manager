const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);


const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.contoller');

const {
  products,
  product,
  requestNewProduct,
  newProduct,
  productToEditIdResult,
  productToEditRequest,
  badNameRequestProduct
} = require('./mock/products.controller.mock');

describe('Testes da camada Controller/Products', () => {
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

      it('Em caso de falha deve retornar status 404 com a msg "PRODUCTS_NOT_FOUND"', async () => {
        const req = {};
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsService, 'getProducts').resolves(
          { type: 'PRODUCTS_NOT_FOUND', message: 'Products not found' }
        );
        await productsController.getProducts(req, res);
        expect(res.status).to.have.been.calledWith(404);
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

    describe('Testando a função "createProduct"', () => { 
      it('Em caso de sucesso deve retornar o novo produto cadastrado.', async  () => { 
        const req = { body: requestNewProduct  };
        const res = {  };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsService, 'createProduct').resolves({ type: null, message: newProduct });
        await productsController.createProduct(req, res);

        expect(res.status).to.have.been.calledWith(201);
        expect(res.json).to.have.been.calledWith( newProduct );
      });

      it('Caso o valor "name" não exista, deve retornar "\"name\" is required" ', async () => { 
        const req = { body: badNameRequestProduct };
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsService, 'createProduct').resolves(
          { type: 'FAIL_ON_CREATE_PRODUCT', message: '"name" is required' }
        );
        await productsController.createProduct(req, res);

        expect(res.status).to.have.been.calledWith(400);
      });
    });

    describe('Testando a função "editProduct"', () => { 
      it('Deve retornar o produto editado pelo ID especificado', async () => { 
        const req = { params: { id: 1 }, body: productToEditRequest };
        const res = productToEditIdResult;

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(productToEditIdResult);

        sinon.stub(productsService, 'editProduct').resolves({ type: null, message: productToEditIdResult });
        await productsController.editProduct(req, res); 

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(productToEditIdResult);
      });

      it('Em caso de falha deve retornar o status 404 com a msg "PRODUCT_NOT_FOUND"', async () => { 
        const req = { params: { id: 5 }, body: { "name": "Martelo do Batman" } };
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsService, 'editProduct').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
        await productsController.editProduct(req, res);
        
        expect(res.status).to.have.been.calledWith(404);
      });
    });

    describe('testando a função "deleteProduct"', () => { 
      it('Deve retornar o status "204" sem nenhuma mensagem', async () => {
        const req = { params: { id: 1 } };
        // fonte https://stackoverflow.com/questions/47502851/res-status-not-a-function-when-trying-to-set-the-status-code
        const res = { end: function () { } };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsService, 'deleteProduct').resolves({ type: null, message: '' });
        await productsController.deleteProduct(req, res);

        expect(res.status).to.have.been.calledWith(204);
      });
      
      it('Em caso de falha deve retornar a mensagem "Product not found"', async () => { 
        const req = { params: { id: 5 } };
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsService, 'deleteProduct').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
        await productsController.deleteProduct(req, res);


        expect(res.status).to.have.been.calledWith(404);
      });
    });
  });
 });
