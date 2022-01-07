import React, {useState} from 'react';
import { Button } from "@strapi/design-system/Button";
import { Box } from '@strapi/design-system/Box';
import { Typography } from '@strapi/design-system/Typography';
import { Flex } from '@strapi/design-system/Flex';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import {saveAs} from "file-saver";
import {fetchEntries} from "../../utils/contentApis";
import JsonDataDisplay from "../../components/JsonDataDisplay";

const ExportModel = ({model}) => {
  const [fetching, setFetching] = useState(false);
  const [content, setContent] = useState(null);
  const fetchModelData = () => {
    setFetching(true);
    return fetchEntries(model.apiID, model.schema.kind).then((data) => {
      setContent(data);
    }).finally(() => {
      setFetching(false);
    });
  };

  const downloadJson = () => {
    const current = new Date();
    const file = new File([JSON.stringify(content)],
      `${model.apiID}-${current.getTime()}.json`,
      {type: "application/json;charset=utf-8"});
    saveAs(file);
  };
  return (<Box padding={4} margin={4} shadow="filterShadow" hasRadius background="neutral0">
    <Grid gap={4}>
      <GridItem col={9}>
        <Typography variant="epsilon">{model.schema.displayName}</Typography>
      </GridItem>
      <GridItem col={3}>
        <Flex justifyContent="space-between">
          <Button disabled={fetching}
                  loading={fetching}
                  onClick={fetchModelData}
                  secondaryHotline>{fetching ? "Fetching" : "Fetch"}</Button>
          <Button disabled={!content}
                  onClick={downloadJson}
                  variant={content ? 'secondaryHotline' : 'secondary'}
          >Download</Button>
        </Flex>
      </GridItem>
    </Grid>
    {
      content && (<JsonDataDisplay data={content}/>)
    }
  </Box>)
};

export default ExportModel;
