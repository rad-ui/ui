import DataListRoot from './fragments/DataListRoot';
import DataListItem from './fragments/DataListItem';
import DataListLabel from './fragments/DataListLabel';
import DataListValue from './fragments/DataListValue';

const DataList = () => {
    console.warn('Direct usage of DataList is not supported. Please use DataList.Root, DataList.Item, etc. instead.');
    return null;
};

export default DataList;

DataList.Root = DataListRoot;
DataList.Item = DataListItem;
DataList.Label = DataListLabel;
DataList.Value = DataListValue;
