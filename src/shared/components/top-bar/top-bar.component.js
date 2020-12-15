import { defineComponent } from "vue";

export default defineComponent({
  name: "TopBar",

  setup(_, { emit }) {
    const sortUser = value => {
      emit("sorted", value);
    };

    return { sortUser };
  },
});
