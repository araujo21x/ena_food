declare namespace Express {
  export interface Request {
    file: Express.Multer.File & Express.MulterS3.File;
    userId: Express.Types.ObjectId;
    userRole: import('../../../app/utils/types/enums/UserRole').default;
  }
}
