module.exports = {
  title: 'Parcel Shelf',
  serialPort: {
	port: '/dev/ttyACM0',
	baud: 115200
  },
  security: {
    requireAuth: false,
    password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', // sha256 hash
    allowedIPs: [] // Array of IP addresses that don't require authorization
  },
  presets: [
    'Stop tailgating',
    'Turn your high-beam off',
    'Learn to indicate'
  ],
}
