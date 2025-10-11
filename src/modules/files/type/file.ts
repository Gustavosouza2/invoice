export type File = {
  invoiceId: string;
  createdAt: Date;
  type: string;
  url: string;
  id: string;
};

export type GetFileRequest = {
  id: string;
};

export type GetFileResponse = Awaited<File>;

export type UpdateFileRequest = {
  file: Express.Multer.File;
};

export type UpdateFileResponse = string;
