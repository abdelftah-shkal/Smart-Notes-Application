/**
 * Workspace Flow — Server Entry Point
 * @author Abdelfatah
 */

require('dotenv').config();
const { initializeApp } = require('./src/bootstrap');
const { env } = require('./src/config/environment.config');

const PORT = env.PORT;

const app = initializeApp();

app.listen(PORT, () => {
  console.log(`\n🚀 Workspace Flow API running on http://localhost:${PORT}`);
  console.log(`   Environment : ${env.NODE_ENV}`);
});
