// Replace the current QR code part with this:
client.on('qr', (qr) => {
  console.log('📱 SCAN THIS QR CODE WITH YOUR WHATSAPP:');
  console.log('If QR doesnt scan, try:');
  console.log('1. Zoom in on the QR code');
  console.log('2. Screenshot and scan from photos');
  console.log('3. Ensure good lighting');
  qrcode.generate(qr, { small: false }); // Changed to LARGE version
});
