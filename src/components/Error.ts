// ErrorComponent.ts
import { defineComponent } from 'vue';

interface ErrorObject {
  code: string;
}

export default defineComponent({
  props: {
    error: {
      type: Object as () => ErrorObject,
      required: true,
    },
  },
  computed: {
    errorMessage() {
      switch (this.error.code) {
        case "DUPLICATE_USERNAME":
          return "Korisničko ime je već zauzeto.";
        case "BAD_PICTURE_DATA":
          return "Slika nije u ispravnom formatu.";
        case "LOGGED_IN":
          return "Već ste prijavljeni.";
        case "INCORRECT_CREDENTIALS":
          return "Korisničko ime ili lozinka nisu ispravni.";
        case "INVALID_DATA":
          return "Podaci nisu ispravni.";
        case "NO_SUCH_ENTITY":
          return "Entitet ne postoji.";
        case "NOT_YOURS":
          return "Ovo nije vaš entitet.";
        case "NOT_AUTHENTICATED":
          return "Niste prijavljeni.";
        case "INTERNAL_ERROR":
          return "Unutrašnja greška.";
        default:
          return "Greška.";
      }
    },
  },
});