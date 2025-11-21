client.on('qr', (qr) => {
  console.log('📱 SCAN THIS QR CODE - Use any QR scanner app:');
  // This creates a more compact QR code
  qrcode.generate(qr, { 
    small: true  // Smaller QR code
  });
  console.log('If still too big, press Cmd + (-) to zoom out browser');
});
