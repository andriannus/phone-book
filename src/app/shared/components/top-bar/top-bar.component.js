import { defineComponent } from "vue";

import { SORTED } from "@/app/shared/constants/emit.constant";

export default defineComponent({
  name: "TopBar",

  setup(_, { emit }) {
    const sortUser = value => {
      emit(SORTED, value);
    };

    return { sortUser };
  },
});
