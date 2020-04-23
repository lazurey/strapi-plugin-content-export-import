import React, {memo, useState, useEffect} from 'react';
// import PropTypes from 'prop-types';
import {PluginHeader,} from "strapi-helper-plugin";

import pluginId from '../../pluginId';
import Nav from "../../components/Nav";
import {MainDiv} from "../ExportPage/ui-components";
import ImportForm from "./ImportForm";
import {getModels} from "../../utils/contentApis";

const ImportPage = () => {
  const [models, setModels] = useState([]);

  useEffect(() => {
    async function loadContentTypes() {
      const models = await getModels();
      setModels(models);
    }
    loadContentTypes();
  }, []);
  return (
    <div className="container-fluid" style={{padding: "18px 30px"}}>
      <PluginHeader
        title="Import Content"
        description={pluginId + " / Import data from file"}
      />
      <Nav/>
      <MainDiv>
        <h2>Import content</h2>
        <ImportForm models={models}/>
      </MainDiv>
    </div>
  );
};

export default memo(ImportPage);
