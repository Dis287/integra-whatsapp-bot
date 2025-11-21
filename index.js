client.on('qr', (qr) => {
  console.log('🔄 FRESH QR CODE - SCAN NOW:');
  qrcode.generate(qr, { small: true });
  console.log('If this fails, restart WhatsApp and try again');
});
