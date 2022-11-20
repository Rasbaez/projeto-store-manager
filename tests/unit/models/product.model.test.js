const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { products, product, productToeditResult, deletedProduct }  = require('./mocks/products.model.mock');
const  productsModel  = require('../../../src/models/product.model');
const connection = require('../../../src/models/connection');

describe('Testes da camada Model/Products', () => {
  describe('Testes unitários', () => { 
    afterEach(sinon.restore);
    describe('Testando a função allProducts', () => { 

    it('Verifica se encontra todos os produtos cadastrados ', async () => {
      sinon.stub(connection, 'execute').resolves([products])

      const result = await productsModel.allProducts();

      expect(result).to.be.deep.equal(products);
    });
    });

    describe('Testando a função getById', () => { 
      it('Verifica se encontra um produto por id', async () => {
        sinon.stub(connection, 'execute').resolves([[product]]);

        const result = await productsModel.getById(product.id);

        expect(result).to.be.deep.equal(product);
      });
    });

    describe('Testes da função createProduct', () => {
      it('A função deve cadastrar um produto novo', async () => {
        sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

        const result = await productsModel.createProduct('xablau');

        expect(result).to.be.deep.equal({ id: 4, name: 'xablau' });
      });
    });

    describe('Teste da função "editProduct"', () => { 
      it('A função deve editar um produto solicitado por ID no db', async () => { 
        sinon.stub(connection, 'execute').resolves([productToeditResult]);

        const result = await productsModel.editProduct(1, 'Martelo do Batman');

        expect(result).to.be.deep.equal(productToeditResult);
      }); 
    });

    describe('Teste da função "deleteProduct"', () => {
      it('A função deve deletar um protudo solicitado por id no db', async () => { 
        sinon.stub(connection, 'execute').resolves([deletedProduct]);

        const result = await productsModel.deleteProduct(1);

        expect(result).to.be.deep.equal(deletedProduct);
      });
    })
  });
});


