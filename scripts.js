// Inicializa o Prebid.js
var pbjs = pbjs || {};
pbjs.que = pbjs.que || [];

// Configuração do CMP (GDPR/CCPA)
pbjs.que.push(function() {
  pbjs.setConfig({
    consentManagement: {
      gdpr: {
        cmpApi: 'iab',  // Tipo de CMP (ex.: IAB)
        timeout: 8000,  // Tempo limite de espera
        allowAuctionWithoutConsent: false // Não permite leilão sem consentimento
      },
      usp: {
        cmpApi: 'iab', // CCPA
        timeout: 8000
      }
    }
  });
});

// Configuração do UserID Module
pbjs.que.push(function() {
  pbjs.setConfig({
    userSync: {
      userIds: [
        {
          name: 'pubProvidedId',
          storage: {
            name: 'pubProvidedId',
            type: 'html5',
            expires: 30
          },
          params: {
            eids: [
              {
                source: 'example.com',
                uids: [
                  { id: '12345', atype: 1 }
                ]
              }
            ]
          }
        }
      ]
    }
  });
});

// Configuração dos Ad Units
pbjs.que.push(function() {
  pbjs.addAdUnits([{
    code: 'ad-container',
    mediaTypes: {
      banner: {
        sizes: [[300, 250]] // Tamanhos do banner
      }
    },
    bids: [
      {
        bidder: 'exampleBidder', // Adaptador de bidder
        params: {
          placementId: '12345' // ID do posicionamento do bidder
        }
      }
    ]
  }]);
});

// Solicitação de Bids
pbjs.que.push(function() {
  pbjs.requestBids({
    bidsBackHandler: function(bidResponses) {
      console.log('Bids:', bidResponses);
      // Aqui você pode conectar o Prebid com o Google Publisher Tag (GPT)
    }
  });
});
