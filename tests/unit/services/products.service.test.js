const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsService = require('../../../src/services/products.service');
const { products, product, failureRequest } = require('./mocks/products.service.mock');
const productsModel = require('../../../src/models/product.model');

describe('Testes da camada Service', () => { 
  describe('Testes unitários', () => { 
    afterEach(sinon.restore);

    describe('Testes da função "getProducts"', () => { 

      it('Em caso de sucesso deve retornar a lista de produtos no formato correto.', async () => { 
        sinon.stub(productsModel, 'allProducts').resolves(products);
        const result = await productsService.getProducts();

        expect(result).to.deep.equal({ type: null, message: products });
      });

    
      it('Em caso de falha deve retornar a mensagem "PRODUCTS_NOT_FOUND", no formato correto.', async () => { 
      sinon.stub(productsModel, 'allProducts').resolves();

      const result = await productsService.getProducts();

      expect(result).to.deep.equal(failureRequest);
    });
    });

    describe('Testes da função "getById"', () => {
      it('Caso sucesso a função deve retornar o produto, no formato correto. ', async () => {
        sinon.stub(productsModel, 'getById').resolves(product);

        const result = await productsService.getById(product.id);

        expect(result).to.be.deep.equal({ type: null, message: product });
      });

      
      it('Em caso de erro a mensagem "PRODUCT_NOT_FOUND" deve ser retornada, no formato correto.', async () => {
        sinon.stub(productsModel, 'getById').resolves();

        const result = await productsService.getById(product.id);

        expect(result).to.be.deep.equal({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      });
    });

  });
});