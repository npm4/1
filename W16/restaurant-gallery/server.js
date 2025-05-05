const express = require('express');
const app = express();
const PORT = 3000;

// Serve all files in the public folder statically
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Static site running at http://localhost:${PORT}`);
});
