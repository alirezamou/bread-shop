import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faIcons,
  faPlus,
  faArrowLeftLong,
  faTimes,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
library.add(faIcons, faPlus, faArrowLeftLong, faTimes, faCartShopping);

export default (app) => {
  app.component("fa-icon", FontAwesomeIcon);
};
