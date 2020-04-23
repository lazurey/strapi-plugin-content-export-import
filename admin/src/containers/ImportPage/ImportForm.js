import React, {useState} from 'react';
import {Button, InputSelect} from "strapi-helper-plugin";
import {convertModelToOption} from "../../utils/convertOptions";
import {map} from 'lodash';
import {FieldRow, FileField, FormAction} from "./ui-components";
import {readLocalFile} from "../../utils/file";
import JsonDataDisplay from "../../components/JsonDataDisplay";

const ImportForm = ({models}) => {
  const options = map(models, convertModelToOption);

  const [loading, setLoading] = useState(false);

  const [targetModel, setTargetModel] = useState(undefined);
  const [sourceFile, setSourceFile] = useState(null);
  const [source, setSource] = useState(null);

  const onTargetModelChange = (event) => {
    setTargetModel(event.target.value);
  };

  const onSourceFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSource(null);
      setSourceFile(event.target.files[0])
    }
  };

  const upload = () => {
    if (!sourceFile) {
      return;
    }
    setLoading(true);
    readLocalFile(sourceFile, JSON.parse).then(setSource)
    // TODO: show error message
    .catch(console.log).
    finally(() => {
      setLoading(false);
    })
  };

  const submit = () => {
    // TODO: form value validate
    console.log(targetModel);
  };
  return (<div>
    <FieldRow>
      <label htmlFor="source">Content Source File</label>
      <FileField>
        <input id="source"
               name="source"
               accept={".json"}
               type="file"
               onChange={onSourceFileChange}
        />
      </FileField>
    </FieldRow>
    { source
      ? (<JsonDataDisplay data={source} />)
      : (<FormAction>
          <Button disabled={loading}
                  onClick={upload}
                  secondaryHotline>{loading ? "Please Wait..."
            : "Upload"}</Button>
        </FormAction>)
    }
    <FieldRow>
      <label htmlFor="target-content-type">Target Content Type</label>
      <InputSelect name="targetContentType"
                   id="target-content-type"
                   selectOptions={options}
                   value={targetModel}
                   onChange={onTargetModelChange}/>
    </FieldRow>
    <FormAction>
      <Button disabled={loading}
              onClick={submit}
              primary>{loading ? "Please Wait..." : "Import"}</Button>
    </FormAction>
  </div>)
};

export default ImportForm;
