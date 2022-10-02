import { DefaultInterface } from './default.interface';

export interface UserInterface extends DefaultInterface {
  username: string;
  password: string;
  email: string;
  status: boolean;
}
