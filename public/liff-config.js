const LIFF_ID = '2005794867-OZWq52yD'; // prod
// const LIFF_ID = '2002126306-rG8n6Bnp'; // dev
const PROD = true;
const DOMAIN = "https://test-api.net/";
// const DOMAIN = "http://localhost:5000/";
// const DOMAIN = "https://test.test-api.net/";


const URL_COUNT_VIEW_SHOP = DOMAIN+"api/v1/cat-bot/count-view-shop";
const URL_UPDATE_VIEW_SHOP = DOMAIN+"api/v1/cat-bot/update-view-shop";

var profileTest = {
    userId:'U88ca6af84181b2f92c62f50ab4b5da52',
    displayName:'Tent365💰💰',
    statusMessage:'อย่าพยายาม ทำในสิ่งที่เป็นไปไม่ได้',
    pictureUrl:'https://profile.line-scdn.net/0h3-mBgel0bAJAO3l34VQSfTBrb2hjSjUQPw0jNnNoYWZ9CX8DaQoqMCY7MmUpDC9ROw5xYHE6YWFMKBtkXm2QNkcLMTN8CCtXa18i4w'
}

function nextTo(url){
    window.location.href = url;
}