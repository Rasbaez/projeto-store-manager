const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { products, product }  = require('./mocks/products.model.mock');
const  productsModel  = require('../../../src/models/product.model');
const connection = require('../../../src/models/connection');

describe('Testes da camada Model', () => {
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

    describe('Testes da função createProduct', () => { 
      it('A função deve cadastrar um produto novo', async () => {
        sinon.stub(connection, 'execute').resolves([{ insertId:4 }]);
        
        const result = await productsModel.createProduct('xablau'); 
      
       
        expect(result).to.be.deep.equal({ id: 4, name: 'xablau' });
        
       });
    });
    });
  });
});


