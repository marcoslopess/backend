require('dotenv').config();

import api from './api';

const PORT = process.env.PORT || 8197;

api.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  console.log('');
});
