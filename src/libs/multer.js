import multer, { diskStorage } from 'multer';

export default multer({
  storage: diskStorage({}),
  limits: { fileSize: 10485760 }
});