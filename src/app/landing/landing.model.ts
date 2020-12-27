import { UserSort } from "@/app/shared/enums/user.enum";
import { RandomUserData } from "@/app/shared/models/random-user.model";
import { PaginatedData } from "@/app/shared/utils/pagination";

export interface LandingState {
  clientWidth: number;
  didSomethingWrong: boolean;
  isDataReady: boolean;
  paginatedUsers: PaginatedData<RandomUserData>;
}

export interface LandingUrlQuery {
  page?: string;
  sortBy?: UserSort;
}
