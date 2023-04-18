import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faIcons,
  faPlus,
  faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";
library.add(faIcons, faPlus, faArrowLeftLong);

export default (app) => {
  app.component("fa-icon", FontAwesomeIcon);
};
