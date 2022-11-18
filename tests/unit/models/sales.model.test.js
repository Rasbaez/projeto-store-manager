const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const {
  salesList,
  salesById,
  saleregistred,
  saleRegisterRequest
} = require('./mocks/sales.model.mock');
const salesModel = require('../../../src/models/sales.model');
const connection = require('../../../src/models/connection');

describe('Testes da camada Model', () => { 
  describe('Testes unitários (sales)', () => { 
    afterEach(sinon.restore);

    describe('Teste da função "allSales"', () => { 

      it('A função "allSales", deve retornar a lista de vendas cadastradas', async () => { 
        sinon.stub(connection, 'execute').resolves([salesList]);

        const allSalesList = await salesModel.allSales();
        expect(allSalesList).to.be.deep.equal(salesList);
      });
    });

    describe('Teste da função "getSaleById"', () => { 
      it('Deve retornar a venda com o conforme ID solicitado', async () => { 
        sinon.stub(connection, 'execute').resolves([salesById]);

        const salesListById = await salesModel.getSaleById(1);
        expect(salesListById).to.be.deep.equal(salesById);
      });
    });

    describe('Teste da função "insertIdSale"', () => { 
      it('A função deve retornar o id para venda cadastrada', async () => { 
        sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
      
        const insertSaleid = await salesModel.insertIdSale();
        expect(insertSaleid).to.be.deep.equal({ id: 3 });

      });
    });

    describe('Teste da função "insertSale"', () => {
      it('A função deve cadastrar uma venda com sucesso no banco de dados', async () => {
        sinon.stub(connection, 'execute').resolves([saleregistred]);

        const insertSaleId = await salesModel.insertIdSale();
        const { id } = insertSaleId;

        const insertSale = await salesModel.insertSale(saleRegisterRequest, id);

        expect(insertSale).to.be.deep.equal(saleregistred);
      });
    });
  });
});