import React, {memo, useEffect, useState} from 'react';
// import PropTypes from 'prop-types';
import {Button, InputSelect, PluginHeader,} from "strapi-helper-plugin";

import pluginId from '../../pluginId';
import Nav from "../../components/Nav";
import {MainDiv} from "../ExportPage/ui-components";
import {getModels} from "../../utils/contentApis";
import {FieldRow, FormAction} from "../ImportPage/ui-components";
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

  const onTargetModelChange = (event) => {
    setTargetModel(event.target.value);
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
    <div className="container-fluid" style={{padding: "18px 30px"}}>
      <PluginHeader
        title="Utilities"
        description={pluginId + " / Easy and dangerous"}
      />
      <Nav/>
      <MainDiv>
        <h2>Utilities</h2>
        <div>
          <FieldRow>
            <label htmlFor="target-content-type">Target Content Type</label>
            <InputSelect name="targetContentType"
                         id="target-content-type"
                         selectOptions={options}
                         value={targetModelUid}
                         onChange={onTargetModelChange}/>
          </FieldRow>
          <FormAction>
            <Button disabled={loading}
                    onClick={submit}
                    primary>{loading ? "Please Wait..." : "Delete All Content"}</Button>
          </FormAction>
        </div>
      </MainDiv>
    </div>
  );
};

export default memo(UtilPage);
