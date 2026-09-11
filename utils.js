function generateTrackingId() {
  return 'TRK-' + Math.floor(100000 + Math.random() * 900000);
}

module.exports = { generateTrackingId };
