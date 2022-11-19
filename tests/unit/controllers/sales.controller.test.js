const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);


const { saleRegistred, saleslist, saleById } = require('./mock/sales.controller.mock');
const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');


describe('Testeda camada Controller/Sales', () => {
  describe('Testes unitários', () => { 
    afterEach(sinon.restore);

    describe('Teste da função "createSale" ', () => { 
      it('A função deve retornar a a venda registrada', async () => { 
        const { itemsSold, id } = saleRegistred;
        sinon.stub(salesService, 'createSale').resolves({ type: null, message: null, id });
       
        const req = { body: itemsSold};
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();


        await salesController.createSale(req, res);

        expect(res.status).to.have.been.calledWith(201);
        expect(res.json).to.have.been.calledWith(saleRegistred);
      });
    });
    describe('Teste da função "getAllsales"', () => {
      it('A função deve retornar ', async () => {
        const { saleId } = saleslist
        sinon.stub(salesService, 'getAllSales').resolves({ type: null, message: null, saleId });
        const req = {};
        const res = saleslist;

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);

        await salesController.getAllSales(req, res);

        expect(res.status).to.have.been.calledWith(200);
      });
    });

    describe('Teste da função "getSaleById"', () => {
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
    });
  });
 });
