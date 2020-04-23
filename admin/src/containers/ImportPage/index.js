/*
 *
 * Import Page
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import {
  HeaderNav,
  // LoadingIndicator,
  PluginHeader,
} from "strapi-helper-plugin";

import pluginId from '../../pluginId';
import { getUrl } from '../../utils/getUrl';

const ImportPage = () => {
  return (
    <div className="container-fluid" style={{padding: "18px 30px"}}>
      <PluginHeader
        title="Import Content"
        description={pluginId + " / Import data from file"}
      />
      <HeaderNav
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
      />
      <div>
        Import
      </div>
    </div>
  );
};

export default memo(ImportPage);
