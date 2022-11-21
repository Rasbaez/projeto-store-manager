const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);


const { saleRegistred, saleslist, saleById, editedSale } = require('./mock/sales.controller.mock');
const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');

const SALE_NOT_FOUND = { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

describe('Testeda camada Controller/Sales', () => {
  describe('Testes unitários', () => { 
    afterEach(sinon.restore);

    describe('Teste da função "createSale" ', () => { 
      it('A função deve retornar a a venda registrada', async () => { 
        const { itemsSold, id } = saleRegistred;
        sinon.stub(salesService, 'createSale').resolves({ id });
       
        const req = { body: itemsSold};
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();


        await salesController.createSale(req, res);

        expect(res.status).to.have.been.calledWith(201);
      });
    });
    describe('Teste da função "getAllsales"', () => {
      it('A função deve retornar todas as vendas ', async () => {

        const req = {};
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(salesService, 'getAllSales').resolves({ type: null, message: saleslist });
        await salesController.getAllSales(req, res);

        expect(res.status).to.have.been.calledWith(200);
      });
    });

    describe('Testes da função "getSaleById"', () => {
      it('Deve retornar a venda pelo ID', async () => {
        sinon.stub(salesService, 'getSaleById').resolves({ type: null, message: saleById })
        const req = { params: 1 };
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await salesController.getSaleById(req, res);

        expect(res.status).to.have.been.calledOnceWith(200);
        expect(res.json).to.have.been.calledWith(saleById);
      });

      it('Caso não exista o produto, deve retornar o status 404, e a msg: "SALE_NOT_FOUND"', async () => {
        const req = { params: 5 };
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(salesService, 'getSaleById').resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' })
        await salesController.getSaleById(req, res);

        expect(res.status).to.have.been.calledOnceWith(404);
      });
    });

    describe('Teste da função "deleteSaleById"', () => { 
      it('A função deve deletar uma venda do db, de acordo ao ID solicitado', async () => { 
        const req = { params: { id: 1 } };
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(salesService, 'deleteSaleById').resolves({ type: null, message: saleById })
        await salesController.deleteSaleById(req, res);

        expect(res.status).to.have.been.calledOnceWith(204);
      });

      it('caso o produto não exista deve retornar a msg: "Sale not found"', async () => { 
        const req = { params: { id: 666 } };
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(salesService, 'deleteSaleById').resolves(SALE_NOT_FOUND)
        await salesController.deleteSaleById(req, res);

        expect(res.status).to.have.been.calledOnceWith(404);
      });
    });

    describe('Teste da função "editSaleById"', () => { 
      it('A função deve editar no db a venda solicitada por id', async () => { 
        const req = { params: { id: 1 } };
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(salesService, 'editSaleById').resolves({ type: null, message: editedSale })
        await salesController.editSaleById(req, res);

        expect(res.status).to.have.been.calledOnceWith(200);
      });

      it('Caso não encontre uma venda, deve retornar a mensagem: "Sale not found"', async () => { 
        const req = { params: { id: 666 } };
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(salesService, 'editSaleById').resolves(SALE_NOT_FOUND)
        await salesController.editSaleById(req, res);

        expect(res.status).to.have.been.calledOnceWith(404);
      });
    });
  });
 });
