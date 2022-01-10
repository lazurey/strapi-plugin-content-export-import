import React, {useState, useEffect} from 'react';
import { Select, Option } from '@strapi/design-system/Select';
import { Stack } from '@strapi/design-system/Stack';
import { Box } from '@strapi/design-system/Box';
import { Button } from "@strapi/design-system/Button";
import { Status } from '@strapi/design-system/Status';
import { Typography } from '@strapi/design-system/Typography';
import { convertModelToOption } from "../../utils/convertOptions";
import { find, get, map } from 'lodash';
import { FileField, FormAction } from "./ui-components";
import { readLocalFile } from "../../utils/file";
import JsonDataDisplay from "../../components/JsonDataDisplay";
import { importData } from "../../utils/api";

const ImportForm = ({models}) => {
  const options = map(models, convertModelToOption);
  const [loading, setLoading] = useState(false);
  const [targetModelUid, setTargetModel] = useState(undefined);
  const [sourceFile, setSourceFile] = useState(null);
  const [source, setSource] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (!targetModelUid && models && models.length > 0) {
      setTargetModel(models[0].uid);
    }
  }, [models]);

  const onTargetModelChange = (value) => {
    setTargetModel(value);
  };

  const onSourceFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSource(null);
      setSourceFile(event.target.files[0])
    }
  };

  const upload = () => {
    setError(null);
    if (!sourceFile) {
      setError("Please choose a source file first.");
      return;
    }
    setLoading(true);
    readLocalFile(sourceFile, JSON.parse).then(setSource)
    .catch((error) => {
      setError("Something wrong when uploading the file, please check the file and try again.");
      console.error(error);
    }).finally(() => {
      setLoading(false);
    })
  };

  const submit = () => {
    if (!targetModelUid) {
      setError("Please select a target content type!");
      return;
    }
    if (!source) {
      setError("Please choose a source file first.")
      return;
    }
    const model = find(models, (model) => model.uid === targetModelUid);
    setLoading(true);
    importData({
      targetModel: model.uid,
      source,
      kind: get(model, 'schema.kind'),
    }).then(() => {
      setError(null);
      setSuccess("Import succeeded!");
    }).catch((error) => {
      console.log(error);
      setSuccess(null);
      setError("Import content failed: " + error.message);
    }).finally(() => {
      setLoading(false);
    });
  };
  return (<Stack size={4} padding={4}>
    <Box padding={4} shadow="filterShadow" hasRadius background="neutral0">
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
      <Typography variant="beta">Step 1: Upload source file</Typography>
      <FileField>
        <input id="source"
               name="source"
               accept={".json"}
               type="file"
               onChange={onSourceFileChange}
        />
      </FileField>
      {source
        ? (<JsonDataDisplay data={source}/>)
        : (<FormAction>
          <Button disabled={loading}
                  variant="secondary"
                  onClick={upload}>{loading ? "Please Wait..." : "Upload"}</Button>
        </FormAction>)
      }
    </Box>
    <Box padding={4} margin={4} shadow="filterShadow" hasRadius background="neutral0">
      <Typography variant="beta">Step 2: Choose target content type</Typography>
      <Select name="targetContentType"
                   id="target-content-type"
                   value={targetModelUid}
                   onChange={onTargetModelChange}>
        {
          options.map((option) => <Option value={option.value} key={option.value}>{option.label}</Option>)
        }
      </Select>
      <FormAction>
        <Button disabled={loading}
                onClick={submit}
                variant='default'
                >{loading ? "Please Wait..." : "Import"}</Button>
      </FormAction>
    </Box>
  </Stack>)
};

export default ImportForm;
