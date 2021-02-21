import { defineComponent } from "vue";

export default defineComponent({
  name: "Card",

  setup(_, { slots }) {
    return (): JSX.Element => (
      <div class="Card Card--borderless Card--elevated">
        <div class="CardBody">{slots.default!()}</div>
      </div>
    );
  },
});
