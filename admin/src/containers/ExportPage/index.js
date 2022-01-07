/*
 *
 * Export Page
 *
 */

import React, {memo, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import Nav from '../../components/Nav';
import {getModels} from '../../utils/contentApis';
import ExportModel from "./ExportModel";

import {MainDiv} from './ui-components';

const ExportPage = () => {
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
      <h1>Export Content</h1>
      <Nav/>
      <div>
        <h2>Content Types</h2>
        <ul>
          <li>
            {
              models.map((model) => (<ExportModel key={model.uid} model={model}/>))
            }
          </li>
        </ul>
      </div>
    </div>
  );
};

export default memo(ExportPage);
