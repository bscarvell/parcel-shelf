module.exports = {
  serialPort: {
	port: '/dev/cu.usbmodem1411', // Reminder: cu.usbmodem1411 for local. - ttyACM0 for pi
	baud: 115200
  },
  security: {
    requireAuth: true,
    password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', // sha256 hash
    allowedIPs: [] // Array of IP addresses that don't require authorization
  },
  presets: [
    'Stop tailgating',
    'Turn your high-beam off',
    'Learn to indicate'
  ],
}