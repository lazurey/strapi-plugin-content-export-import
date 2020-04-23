import React from 'react';
import { HeaderNav } from "strapi-helper-plugin";

import pluginId from '../pluginId';
import { getUrl } from '../utils/getUrl';

const Nav = () => {
  return (<HeaderNav
    links={[
      {
        name: "Export Data",
        to: getUrl(pluginId, "export")
      },
      {
        name: "Import Import",
        to: getUrl(pluginId, "import")
      }
    ]}
    style={{marginTop: "2.4rem"}}
  />)
};

export default Nav;
