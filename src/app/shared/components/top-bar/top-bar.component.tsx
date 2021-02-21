import { defineComponent } from "vue";

import { SORTED } from "@/app/shared/constants/emit.constant";
import { UserSort } from "@/app/shared/enums/user.enum";

export default defineComponent({
  name: "TopBar",

  emits: [SORTED],

  setup(_, { emit }) {
    function sortUser(value: UserSort): void {
      emit(SORTED, value);
    }

    return (): JSX.Element => (
      <div class="TopBar">
        <div class="TopBar-logo">
          <span class="FontSize-large Color-secondary-60">
            <strong>Qoala Test</strong>
          </span>
        </div>

        <div class="TopBar-actions">
          <div class="TopBar-action">
            <button
              id="BtnSortByColor"
              class="Button Button--primary Button--outlined"
              type="button"
              onClick={() => sortUser(UserSort.Color)}
            >
              Color
            </button>
          </div>

          <div class="TopBar-action">
            <button
              id="BtnSortByCity"
              class="Button Button--primary Button--outlined"
              type="button"
              onClick={() => sortUser(UserSort.City)}
            >
              City
            </button>
          </div>
        </div>
      </div>
    );
  },
});
