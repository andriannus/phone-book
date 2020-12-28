import { UserColor } from "@/app/shared/enums/user.enum";
import { RandomUserData } from "@/app/shared/models/random-user.model";

export interface ColorfulUsersState {
  users: RandomUserData[];
  colorfulUsers: ColorfulUser[];
}

export interface ColorfulUser extends RandomUserData {
  color: UserColor;
}
