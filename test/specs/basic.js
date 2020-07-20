const request = require('supertest');
const expect = require('chai').expect;

describe('GET /user', function() {
  it('responds with a valid zip code', function() {
    return request('https://viacep.com.br') //making an HTTP request
      .get('/ws/91060900/json/') //get json data sent by server
      .set('Accept', 'application/json') //to set a header
      .expect('Content-Type', /json/) //return the response of test
      .expect(200) //fail the test if the response is not 200 response code (success)
      .then(response => { //checks with the data
          expect(response.body).to.deep.equal({"bairro": "São Sebastião",
            "cep": "91060-900",
            "complemento": "",
            "gia": "",
            "ibge": "4314902",
            "localidade": "Porto Alegre",
            "logradouro": "Avenida Assis Brasil 3940",
            "uf": "RS",
            "unidade": ""});
      })
  });

  it('responds with an zip code does not exist', function() {
    return request('https://viacep.com.br')
      .get('/ws/99999999/json/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
          expect(response.body).to.deep.equal({"erro": true});
      })
  });

  it('responds with an invalid format', function() {
    return request('https://viacep.com.br')
      .get('/ws/91*60900/json/')
      .set('Accept', 'application/json')
      .expect('Content-Type', "text/html; charset=utf-8")
      .expect(400) //expect got 400 Bad Request
  });

});
