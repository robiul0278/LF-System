import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string;
    };
  }
}

export type TCategory = {
  name: string;
}



export type TFoundItemReport = {
  categoryId: string;
  foundItemName: string;
  description: string;
  location: string;
}


export type TFilter = {
  foundItemName: string;
  location: string;
  description: string;
  searchTerm?: string;
}