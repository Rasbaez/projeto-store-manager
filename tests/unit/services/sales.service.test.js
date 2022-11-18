const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const salesModel = require('../../../src/models/sales.model');
const salesService = require('../../../src/services/sales.service');

const {
  saleRegisterRequest,
  saleRegistredResult,
  salesList,
  requestedSaleById } = require('./mocks/sales.service.mock');

describe('Testes da camada Service para "Sales"', () => { 
  describe('Testes unitários', () => { 
    afterEach(sinon.restore);

    describe('Teste da função "createSale"', () => { 
    it('Deve retornar a venda cadastrada', async () => { 
      sinon.stub(salesModel, 'insertSale').resolves([saleRegistredResult]);

      const insertSale = await salesService.createSale(saleRegisterRequest);
      const { type, id, message } = insertSale

      expect(insertSale).to.be.deep.equal({ type, id, message });
    });
    });

    describe('Teste da função "getAllSales"', () => { 
      it('Deve retornar a lista de vendas', async () => { 
        sinon.stub(salesModel, 'allSales').resolves([salesList]);

        const allSales = await salesService.getAllSales();
        const { type, message } = allSales;
       
        expect(allSales).to.be.deep.equal({ type, message  });
      });

      it('Em caso de falha deve retornar a mensagem: "SALES_NOT_FOUND"', async () => { 
        sinon.stub(salesModel, 'allSales').resolves([]);

        const allSales = await salesService.getAllSales();

        expect(allSales).to.be.deep.equal(allSales);
      });
    });

    describe('testes da função "getSaleById"', () => {
      it('A função deve retornar a sale com o Id solicitado', async () => { 
        sinon.stub(salesModel, 'getSaleById').resolves([requestedSaleById]);
        
        const saleById = await salesService.getSaleById(1);
        const { type, message } = saleById;
        expect(saleById).to.be.deep.equal({ type, message });
      });

      it('Em caso de falha deve retornar a mensagem: "SALE_NOT_FOUND" ', async () => { 
        sinon.stub(salesModel, 'getSaleById').resolves([]);

        const saleById = await salesService.getSaleById(999);

        expect(saleById).to.be.deep.equal(saleById);

      });
    }); 
  });
});