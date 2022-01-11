import React, { useState } from 'react';
import { Button } from "@strapi/design-system/Button";
import { Box } from '@strapi/design-system/Box';
import { Typography } from '@strapi/design-system/Typography';
import { Status } from '@strapi/design-system/Status';
import { Flex } from '@strapi/design-system/Flex';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { Radio, RadioGroup } from '@strapi/design-system/Radio';
import { saveAs } from "file-saver";
import { fetchAll } from "../../utils/contentApis";
import { convertToCsv } from "../../utils/csvHelper";
import JsonDataDisplay from "../../components/JsonDataDisplay";

const ExportModel = ({model}) => {
  const [fetching, setFetching] = useState(false);
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);
  const [format, setFormat] = useState("json");
  const fetchModelData = () => {
    setFetching(true);
    return fetchAll(model.uid).then((data) => {
      setContent(data);
    }).catch((error) => {
      console.error(error);
      setError("Fetch content failed, please check console for details.")
    }).finally(() => {
      setFetching(false);
    });
  };

  const download = () => {
    const current = new Date();
    const filename = `${model.apiID}-${current.getTime()}`
    if (format === "csv") {
      downloadCsv(filename);
    } else {
      downloadJson(filename);
    }
  }

  const downloadCsv = (filename) => {
    const file = new File([convertToCsv(content.data)], `${filename}.csv`, {type: "text/csv;charset=utf-8"});
    saveAs(file);
  }

  const downloadJson = (filename) => {
    const file = new File([JSON.stringify(content)],
      `${filename}.json`,
      {type: "application/json;charset=utf-8"});
    saveAs(file);
  };
  return (<Box padding={4} margin={4} shadow="filterShadow" hasRadius background="neutral0">
    { error && <Box paddingBottom={4}><Status variant="success">
        <Typography>{error}</Typography>
      </Status></Box>}
    <Grid gap={4}>
      <GridItem col={7}>
        <Typography variant="epsilon">{model.schema.displayName}</Typography>
      </GridItem>
      <GridItem col={2}>
          <Typography id="format-label" variant="pi">Export format</Typography>
          <RadioGroup labelledBy="format-label" onChange={e => setFormat(e.target.value)} value={format} name={`${model.uid}-format`}>
            <Radio value="csv">csv</Radio>
            <Radio checked={format==="json"} value="json">json</Radio>
          </RadioGroup>
      </GridItem>
      <GridItem col={3}>
        <Flex justifyContent="space-between">
          <Button disabled={fetching}
                  loading={fetching}
                  onClick={fetchModelData}
                  variant='default'>{fetching ? "Fetching" : "Fetch"}</Button>
          <Button disabled={!content}
                  onClick={download}
                  variant={content ? 'tertiary' : 'secondary'}
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
