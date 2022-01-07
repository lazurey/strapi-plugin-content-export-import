import React, {memo, useEffect, useState} from 'react';
import { Select, Option } from '@strapi/design-system/Select';
import { Button } from "@strapi/design-system/Button";
import { Box } from "@strapi/design-system/Box";
import { BaseHeaderLayout } from '@strapi/design-system/Layout';
import { Typography } from '@strapi/design-system/Typography';
import pluginId from '../../pluginId';
import Nav from "../../components/Nav";
import {MainDiv} from "../ExportPage/ui-components";
import {getModels} from "../../utils/contentApis";
import { FormAction } from "../ImportPage/ui-components";
import {convertModelToOption} from "../../utils/convertOptions";
import { map } from 'lodash';
import {deleteAll} from "../../utils/api";

const UtilPage = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [targetModelUid, setTargetModel] = useState();

  const options = map(models, convertModelToOption);

  useEffect(() => {
    async function loadContentTypes() {
      const models = await getModels();
      setModels(models);
      setTargetModel(models[0].uid);
    }
    loadContentTypes();
  }, []);

  const onTargetModelChange = (value) => {
    setTargetModel(value);
  };

  const submit = () => {
    setLoading(true);
    console.log(targetModelUid);
    deleteAll(targetModelUid).then((response) => {
      strapi.notification.success(`Successfully deleted ${response.count} records.`);
    }).catch((error) => {
      strapi.notification.error(error.message);
    }).finally(() => {
      setLoading(false);
    })
  };
  return (
    <div>
      <BaseHeaderLayout title="Utilities" subtitle="Additional features" as="h2" />
      <Typography variant="beta">Delete all content of a type</Typography>
      <Box paddingTop={4}>
        <Typography variant="epsilon" lineHeight={6}>Target Content Type</Typography>
        <Select name="targetContentType"
                     id="target-content-type"
                     value={targetModelUid}
                     onChange={onTargetModelChange}>
          {
            options.map(option => <Option key={option.value} value={option.value}>{option.label}</Option>)
          }
        </Select>
      </Box>
      <FormAction>
        <Button disabled={loading}
                onClick={submit}
                primary>{loading ? "Please Wait..." : "Delete All Content"}</Button>
      </FormAction>
    </div>
  );
};

export default memo(UtilPage);
