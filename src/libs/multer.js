import multer, { diskStorage } from 'multer';

export default multer({
  storage: diskStorage({}),
  limits: { fileSize: 1048576 }
});