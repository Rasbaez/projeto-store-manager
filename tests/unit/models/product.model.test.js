const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const  { products, product }  = require('./mocks/products.model.mock');
const  productsModel  = require('../../../src/models/product.model');
const connection = require('../../../src/models/connection');

describe('Testando Funções camada Model', () => {
  describe('Testes unitários', () => { 
    afterEach(sinon.restore);

    it('Verifica se encontra todos os produtos cadastrados ', async () => {
      sinon.stub(connection, 'execute').resolves([[products]])
      const result = await productsModel.getById();
      expect(result).to.be.deep.equal(products);

    });

    it('Verifica se encontra um produto por id', async () => { 
      sinon.stub(connection, 'execute').resolves([[product]]);
      const result = await productsModel.getById(product.id);

      expect(result).to.be.deep.equal(product);
    });
  });
});


