import React from 'react';
import { Link } from '@strapi/design-system/Link';

import pluginId from '../pluginId';
import { getUrl } from '../utils/getUrl';

const Nav = () => {
  return (<ul>
    <li><Link to={getUrl(pluginId, "export")}>Export</Link></li>
    <li><Link to={getUrl(pluginId, "import")}>Import</Link></li>
    <li><Link to={getUrl(pluginId, "utilities")}>Utilities
utilities</Link></li>
    </ul>)
};

export default Nav;
