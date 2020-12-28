import { defineComponent } from "vue";

import { SORTED } from "@/app/shared/constants/emit.constant";
import { UserSort } from "@/app/shared/enums/user.enum";

export default defineComponent({
  name: "TopBar",

  setup(_, { emit }) {
    const sortUser = (value: UserSort): void => {
      emit(SORTED, value);
    };

    return { sortUser, UserSort };
  },
});
