import { RandomUserData } from "@/app/shared/models/random-user.model";
import { UserColor } from "@/app/shared/enums/user.enum";

export interface ColorfulUsersState {
  users: RandomUserData[];
  colorfulUsers: ColorfulUser[];
}

export interface ColorfulUser extends RandomUserData {
  color: UserColor;
}
