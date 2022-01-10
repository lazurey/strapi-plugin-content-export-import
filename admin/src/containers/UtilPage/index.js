import React, { memo, useEffect, useState } from 'react';
import { Select, Option } from '@strapi/design-system/Select';
import { Button } from "@strapi/design-system/Button";
import { Box } from "@strapi/design-system/Box";
import { Status } from "@strapi/design-system/Status";
import { BaseHeaderLayout } from '@strapi/design-system/Layout';
import { Typography } from '@strapi/design-system/Typography';
import { getModels } from "../../utils/contentApis";
import { FormAction } from "../ImportPage/ui-components";
import { convertModelToOption } from "../../utils/convertOptions";
import { map } from 'lodash';
import { deleteAll } from "../../utils/api";

const UtilPage = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [targetModelUid, setTargetModel] = useState();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
    setError(null);
    setSuccess(null);
    return deleteAll(targetModelUid).then((response) => {
      setSuccess(`Successfully deleted ${response.count} records.`);
    }).catch((error) => {
      setError(`Delete content failed: ${error.message}`)
    }).finally(() => {
      setLoading(false);
    });
  };
  return (
    <div>
      <BaseHeaderLayout title="Utilities" subtitle="Additional features" as="h2" />
      { error && <Box paddingBottom={4}><Status variant="danger">
        <Typography>
          {error}
        </Typography>
      </Status></Box>}
      { success && <Box paddingBottom={4}><Status variant="success">
        <Typography>
          {success}
        </Typography>
      </Status></Box>}
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
