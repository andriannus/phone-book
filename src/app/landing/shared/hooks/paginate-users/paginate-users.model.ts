import { RandomUserData } from "@/app/shared/models/random-user.model";
import { PaginatedData } from "@/app/shared/utils/pagination";

export interface PaginateUsersState {
  page: number;
  paginatedUsers: PaginatedData<RandomUserData>;
}
