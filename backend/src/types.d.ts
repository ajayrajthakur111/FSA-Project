/// <reference types="express" />
/// <reference types="mongoose" />

import { IUser } from './models/User'; // Ensure this path is correct

declare global {
  namespace Express {
    interface Request {
      user?: IUser | null;
    }
  }
}

