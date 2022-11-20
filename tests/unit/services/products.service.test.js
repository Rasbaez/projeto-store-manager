const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsService = require('../../../src/services/products.service');

const {
  products,
  product,
  failureRequest,
  newProduct,
  requestWrongValue,
  productToCreate,
  editedProduct,
} = require('./mocks/products.service.mock');

const productsModel = require('../../../src/models/product.model');

describe('Testes da camada Service/Products', () => { 
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

        expect(result).to.be.deep.equal(result);
      });

      
      it('Em caso de erro a mensagem "PRODUCT_NOT_FOUND" deve ser retornada, no formato correto.', async () => {
        sinon.stub(productsModel, 'getById').resolves();

        const result = await productsService.getById(product.id);

        expect(result).to.be.deep.equal(result);
      });
    });

    describe('Testes da função "createProduct', () => { 
      it('Em caso de sucesso deve retornar o novo produto cadastrado', async () => { 
        sinon.stub(productsModel, 'createProduct').resolves(newProduct);
       
        const result = await productsService.createProduct(productToCreate);

        expect(result).to.be.deep.equal({ type: null, message: newProduct });
      });

      it('Caso não exista a chave "name", deve retornar o status 400 "name" is required ', async () => { 
        sinon.stub(productsModel, 'createProduct').resolves();
        
        const result = await productsService.createProduct('ame');

        expect(result).to.be.deep.equal({ type: 'FAIL_ON_CREATE_PRODUCT', message: '"name" is required' });
      });

      it('Caso o nome do produto tenha menos de 6 caracteres deve retornar a segunte msg: "name" length must be at least 5 characters long ', async () => { 
        sinon.stub(productsModel, 'createProduct').resolves();

        
        const result = await productsService.createProduct(requestWrongValue);

        expect(result).to.be.deep.equal({
          type: 'FAILURE_ON_CREATE_PRODUCT',
          message: '"name" length must be at least 5 characters long',
        });
      });
    });

    describe('Testes da função "editProduct"', () => { 
      it('A função deve editar um produto no db, de acordo ao id solicitado', async () => {
        sinon.stub(productsModel, 'editProduct').resolves(editedProduct);

        const result = await productsService.editProduct(3, 'Xablauzeraaaa');
        expect(result).to.be.deep.equal({ type: null, message: editedProduct });
      });
      
      it('Caso o id informado não seja um produto deve retornar a msg: "PRODUCT_NOT_FOUND"', async () => { 
        sinon.stub(productsModel, 'editProduct').resolves();

        const result = await productsService.editProduct(4, 'Xablauzeraaaa');

        expect(result).to.be.deep.equal({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      });
    }); 
    
    describe('Testes da função deleteProduct', () => { 
      it('A função deve deletar um produto do db conforme o id solicitado', async () => { 
        sinon.stub(productsModel, 'deleteProduct').resolves();

        const result = await productsService.deleteProduct(1);
        console.log(result)
        expect(result).to.be.deep.equal({ type: null, message: '' });
      });

      it('Caso não encontre o produto deve retornar a mensagem: "PRODUCT_NOT_FOUND"', async () => { 
        sinon.stub(productsModel, 'deleteProduct').resolves();

        const result = await productsService.deleteProduct(9999999);

        expect(result).to.be.deep.equal({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      });
    }); 
  });
});