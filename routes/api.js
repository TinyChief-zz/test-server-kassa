const express = require('express');
const router = express.Router();
const fs = require('fs');

const statuses = [
  'ready',
  'error',
  'wait',
  'inProgress',
  'interrupted',
  'blocked',
  'canceled',
];

const jobs = {
  openShift: {
    fiscalParams: {
      fiscalDocumentDateTime: new Date(),
      fiscalDocumentNumber: 70,
      fiscalDocumentSign: '0024109209',
      fnNumber: '9999078900000961',
      registrationNumber: '0000000001002292',
      shiftNumber: 12,
      fnsUrl: 'www.nalog.ru',
    },
    warnings: {
      notPrinted: true,
    },
  },
  closeShift: {
    fiscalParams: {
      fiscalDocumentDateTime: new Date(),
      fiscalDocumentNumber: 69,
      fiscalDocumentSign: '1138986989',
      fnNumber: '9999078900000961',
      registrationNumber: '0000000001002292',
      shiftNumber: 11,
      receiptsCount: 3,
      fnsUrl: 'www.nalog.ru',
    },
    warnings: {
      notPrinted: false,
    },
  },
  sell: {
    fiscalParams: {
      fiscalDocumentDateTime: new Date(),
      fiscalDocumentNumber: 71,
      fiscalDocumentSign: '1494325660',
      fiscalReceiptNumber: 1,
      fnNumber: '9999078900000961',
      registrationNumber: '0000000001002292',
      shiftNumber: 12,
      total: 390.75,
      fnsUrl: 'www.nalog.ru'
    },
    warnings: null
  }
};

router.get('/requests', async (req, res) => {
  try {
    res.status(200).send('Hello world');
  } catch (error) {
    res.status(400).send('Error: ', err);
  }
});

// Cоздание нового задания
router.post('/requests', async (req, res) => {
  const { uuid, request } = req.body;
  const data = req.body;

  try {
    fs.writeFile(`data/${uuid}.json`, JSON.stringify(req.body), err => {
      if (err) throw err;
      res.status(201).send({
        created: true,
        message: 'Задания добавлены в очередь.',
        uuid,
      });
    });
  } catch (error) {
    res.status(400).send('Error: ', error);
  }
});

// Получение статуса по UUID
router.get('/requests/:uuid', async (req, res) => {
  const uuid = req.params.uuid;
  try {
    fs.readFile(`data/${uuid}.json`, (err, data) => {
      if (err) throw err;
      let obj = JSON.parse(data);
      // Создаем ответ клиенту
      const results = [];
      obj.requests.forEach(hero => {
        // Для каждой задачи свой ответ
        results.push({
          status: 'ready',
          errorCode: '000',
          errorDescription: null,
          result: jobs[hero.type],
        });
      });
      res.status(200).send({ results });
    });
  } catch (error) {
    res.status(400).send('Error: ', error);
  }
});

module.exports = router;
