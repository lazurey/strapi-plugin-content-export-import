import React, { memo, useState, useEffect } from 'react';
import { BaseHeaderLayout } from '@strapi/design-system/Layout';
import pluginId from '../../pluginId';
import ImportForm from "./ImportForm";
import { getModels } from "../../utils/contentApis";

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
    <div>
      <BaseHeaderLayout title="Import Content" subtitle="Import data from file" as="h2" />
      <ImportForm models={models}/>
    </div>
  );
};

export default memo(ImportPage);
