import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, Table  } from 'antd';
import { dataSliceSelector, fetchData } from './dataSlice';
// const INITIAL_LIMIT = 15;
const INITIAL_OFFSET = 0;
const MINIMUM_PAGE_SIZE = 15;
const INITIAL_FETCH_PARAMS = () => ({
    limit: 15
});

const TableCompnent = () => {
    const [fetchDataParams, setFetchDataParams] = useState(INITIAL_FETCH_PARAMS);
    const [pagination, setPagination] = useState({ activePage: 1, totalPages: 1 });
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize, setPageSize] = useState(15);
    const { data, totalData, skip, limit, activePage } = useSelector(dataSliceSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchData(fetchDataParams));
    }, [fetchDataParams]);

    useEffect(() => {
        setPageSize(limit);
        setTotalItems(skip);
        const totalPages = Math.ceil(totalData / limit);
        const pagActivePage = activePage + 1;
        setTotalItems(totalData);
        console.log(totalPages);
        setPagination({ totalPages, pagActivePage });
    }, [data])

    // const renderDataList = () => (data.lenght
    //     ? (
    //         <Table.Row>
    //             <Table.Cell textAlign="center" colSpan={9}>
    //                 <Header as="h4">No data found!</Header>
    //             </Table.Cell>
    //         </Table.Row>
    //     )
    //     : data.map((dataItem, i) => (
    //         <Table.Row key={i} className="dispaly-button">
    //             <Table.Cell width={1}>{dataItem.obo_id}</Table.Cell>
    //             <Table.Cell width={1}>{dataItem.ontology_name || '-'}</Table.Cell>
    //             <Table.Cell width={1}>{dataItem.synonyms[0] || '-'}</Table.Cell>
    //             <Table.Cell width={1}>{dataItem.label || '-'}</Table.Cell>
    //             <Table.Cell width={1}>{dataItem.ontology_prefix || '-'}</Table.Cell>
    //             <Table.Cell width={1}>{dataItem.is_obsolete ? 'True' : 'False' || '-'}</Table.Cell>
    //             <Table.Cell width={1}>{dataItem.is_defining_ontology ? 'True' : 'False' || '-'}</Table.Cell>
    //             <Table.Cell width={1}>{dataItem.has_children ? 'True' : 'False' || '-'}</Table.Cell>
    //         </Table.Row>
    //     )));

    // const dataListLoading = (
    //     <Table.Row>
    //         <Table.Cell colSpan={13} textAlign="center">
    //             <Dimmer active inverted>
    //                 <Loader
    //                     type="ThreeDots"
    //                     color="#00BFFF"
    //                     height={80}
    //                     width={80}
    //                     timeout={10000}
    //                     className="spinner" />
    //             </Dimmer>
    //         </Table.Cell>
    //     </Table.Row>
    // );

    const handlePaginationChange = (e, data) => {
        console.log(data);
        setFetchDataParams({ ...fetchDataParams, skip: data.activePage - 1 });
    };

    const getPageSizeOptions = () => {
        const options = [MINIMUM_PAGE_SIZE, 50, 100].reduce((acc, cur) => {
          if (totalItems > cur) {
            acc.push({ key: cur, value: cur, text: cur });
          }
          return acc;
        }, []);
        if (options.length < 3) {
          options.push({ key: totalItems, value: totalItems, text: totalItems });
        }
    
        return options;
      };

    const changePageSize = (e, data) => {
        const { value } = data;
        console.log(value);
        console.log(pageSize);
        if (pageSize !== value) {
          setPageSize(value);
          setFetchDataParams({ ...fetchDataParams, limit: value, offset: INITIAL_OFFSET });
        }
      };

      const columns = () => {
          const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
              },
              {
                title: 'Name',
                dataIndex: 'ontology_name',
                key: 'ontology_name',
              },
              {
                title: 'Synonyms',
                dataIndex: 'synonyms',
                key: 'synonyms',
              },
              {
                title: 'Label',
                dataIndex: 'label',
                key: 'label',
              },
              {
                title: 'Prefix',
                dataIndex: 'ontology_prefix',
                key: 'ontology_prefix',
              },
              {
                title: 'Obsolete',
                dataIndex: 'is_obsolete',
                key: 'is_obsolete',
              },
          ];
          return columns;
    }

    const dataItems = () => {
        const dataArray = [];
        data.map((item, i) => {
            const obj = {
                key: i,
                id: item.obo_id,
                ontology_name: item.ontology_name || '-',
                synonyms: item.synonyms.map((item)=>(item ? item + ', ' : '-')),
                label: item.label || '-',
                ontology_prefix: item.ontology_prefix || '-',
                is_obsolete: item.is_obsolete ? 'True' : 'False' || '-',
            }
            dataArray.push(obj);
        })
        return dataArray;
  }


    return (
        <div>
            <Table pagination={false} columns={columns()} dataSource={dataItems()} />
            <Pagination 
                // defaultCurrent={6}
                // total={50}
                defaultCurrent={1}
                pageSize={15}
                // current={pagination.activePage}
                // onChange={handlePaginationChange}
                total={2531}
            />
            {/* <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>id</Table.HeaderCell>
                        <Table.HeaderCell>Ontology Name</Table.HeaderCell>
                        <Table.HeaderCell>Synonyms</Table.HeaderCell>
                        <Table.HeaderCell>Label</Table.HeaderCell>
                        <Table.HeaderCell>Ontology Prefix</Table.HeaderCell>
                        <Table.HeaderCell>Is Obsolete</Table.HeaderCell>
                        <Table.HeaderCell>Is Defining Ontology</Table.HeaderCell>
                        <Table.HeaderCell>Has Children</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        data ? renderDataList(data) : dataListLoading
                    }
                </Table.Body>
            </Table> */}
            {/* <div className="pagination-wrapper">
                <div>
                    {
                        totalItems ? (
                            <span>
                                Showing
                                {' '}
                                <b>{skip + 1}</b>
                                {' '}
                                <b>-</b>
                                <b>
                                    {
                                    Math.min(skip + limit, totalItems)
                                    }
                                </b>
                                {' '}
                                out of
                                {' '}
                                <b>{totalItems}</b>
                            </span>
                        ) : null
                    }
                </div>
                <div className="logs-pagination">
                    <div className="logs-pagination-pagesize">
                        {
                            totalItems > 15 ? (
                                <>
                                    Results per page
                {' '}
                                    {' '}
                                    <Dropdown
                                        onChange={changePageSize}
                                        options={getPageSizeOptions()}
                                        inline
                                        value={pageSize}
                                    />
                                </>
                            ) : null
                        }
                    </div>
                    {
                        totalItems > pageSize
                        && (
                            <Pagination
                                activePage={pagination.activePage}
                                onPageChange={handlePaginationChange}
                                totalPages={pagination.totalPages || 0}
                                ellipsisItem={null}
                                firstItem={null}
                                lastItem={null}
                            />
                        )
                    }
                </div>
            </div> */}
        </div>
    );
};

export default TableCompnent;
