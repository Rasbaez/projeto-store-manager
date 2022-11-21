const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const salesModel = require('../../../src/models/sales.model');
const salesService = require('../../../src/services/sales.service');

const SALE_NOT_FOUND = { type: 'SALE_NOT_FOUND', message: 'Sale not found' };


const {
  saleRegisterRequest,
  saleRegistredResult,
  salesList,
  requestedSaleById,
  saleToEdit

} = require('./mocks/sales.service.mock');

describe('Testes da camada Service/Sales', () => { 
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
    });

    describe('Testes da função "getSaleById"', () => {
      it('A função deve retornar a sale com o Id solicitado', async () => { 
        sinon.stub(salesModel, 'getSaleById').resolves([requestedSaleById]);
        
        const saleById = await salesService.getSaleById(1);
        const { type, message } = saleById;
        expect(saleById).to.be.deep.equal({ type, message });
      });

      it('Em caso de falha deve retornar a mensagem: "SALE_NOT_FOUND" ', async () => { 
        sinon.stub(salesModel, 'getSaleById').resolves([]);

        const saleById = await salesService.getSaleById(999);

        expect(saleById).to.be.deep.equal(SALE_NOT_FOUND);
      });
    }); 

    describe('Testes da função "deleteSaleById"', () => {
      it('Deve deletar uma venda do db conforme o Id solicitado', async () => { 
        sinon.stub(salesModel, 'deleteSaleById').resolves();

        const deleteByid = await salesService.deleteSaleById(1);

        expect(deleteByid).to.be.deep.equal(deleteByid);
      });

      it('Caso não encontre o produto deve retornar o status "Sale not found"', async () => { 
        sinon.stub(salesModel, 'deleteSaleById').resolves();

        const deleteByid = await salesService.deleteSaleById(666);

        expect(deleteByid).to.be.deep.equal(SALE_NOT_FOUND);
      });
    });

    describe('Teste da função "editSaleById"', () => { 
      it('Deve retornar a venda editada', async () => { 
        sinon.stub(salesModel, 'editSaleById').resolves(saleToEdit);

        const result = await salesService.editSaleById(1, saleToEdit);

        expect(result).to.be.deep.equal(result);
      });

      it('Caso não encontre o produto deve retornar o status "Sale not found"', async () => {
        sinon.stub(salesModel, 'editSaleById').resolves();

        const result = await salesService.editSaleById(666, saleToEdit);

        expect(result).to.be.deep.equal(SALE_NOT_FOUND);
      });
    });
  });
});