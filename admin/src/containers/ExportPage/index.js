/*
 *
 * Export Page
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { BaseHeaderLayout } from '@strapi/design-system/Layout';
import { Stack } from '@strapi/design-system/Stack';
import { Box } from '@strapi/design-system/Box';
import { Typography } from '@strapi/design-system/Typography';
import { getModels } from '../../utils/contentApis';
import ExportModel from "./ExportModel";

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
    <div>
      <BaseHeaderLayout title="Export Content" subtitle="Export content into JSON format" as="h2" />
      <Stack size={4} padding={2}>
        <Box key="title">
          <Typography variant="beta">Content Types</Typography>
        </Box>
        {
          models.map((model) => (<ExportModel key={model.uid} model={model}/>))
        }
      </Stack>
    </div>
  );
};

export default memo(ExportPage);
