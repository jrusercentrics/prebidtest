// Check if Cookiebot has granted consent
function checkCookieConsent() {
    return Cookiebot.consent.statistics && Cookiebot.consent.marketing;
}

// Initialize Prebid.js
function initializePrebid() {
    var adUnits = [{
        code: 'ad-container',
        mediaTypes: {
            banner: {
                sizes: [[300, 250]]
            }
        },
        bids: [{
            bidder: 'pubmatic',
            params: {
                publisherId: '123456', // Insira um publisherId válido
            }
        }]
    }];

    pbjs.que.push(function() {
        pbjs.addAdUnits(adUnits);
        pbjs.requestBids({
            bidsBackHandler: function(bidResponses) {
                console.log('Bid Responses:', bidResponses);
                // Render ad in container
                pbjs.renderAd(document.getElementById('ad-container'), bidResponses.adId);
            }
        });
    });
}

// Wait for Cookiebot to be ready
window.addEventListener('CookiebotOnAccept', function() {
    if (checkCookieConsent()) {
        console.log('Consent granted. Initializing Prebid.');
        initializePrebid();
    } else {
        console.log('No consent granted.');
    }
});

// Fallback: Trigger Prebid if Cookiebot consent is already accepted
if (Cookiebot && checkCookieConsent()) {
    initializePrebid();
}
