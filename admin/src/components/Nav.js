import React from 'react';
import { HeaderNav } from "strapi-helper-plugin";

import pluginId from '../pluginId';
import { getUrl } from '../utils/getUrl';

const Nav = () => {
  return (<HeaderNav
    links={[
      {
        name: "Export",
        to: getUrl(pluginId, "export")
      },
      {
        name: "Import",
        to: getUrl(pluginId, "import")
      },
      {
        name: "Utilities",
        to: getUrl(pluginId, "utilities")
      }
    ]}
    style={{marginTop: "2.4rem"}}
  />)
};

export default Nav;
