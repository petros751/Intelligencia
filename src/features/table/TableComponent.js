import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Dimmer, Loader, Header, Pagination, Dropdown } from 'semantic-ui-react';
import {
    dataSliceSelector,
    fetchData,
} from './dataSlice';
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
        setPagination({ totalPages, pagActivePage });
    }, [data])

    const renderDataList = () => (data.lenght
        ? (
            <Table.Row>
                <Table.Cell textAlign="center" colSpan={9}>
                    <Header as="h4">No data found!</Header>
                </Table.Cell>
            </Table.Row>
        )
        : data.map((dataItem, i) => (
            <Table.Row key={i} className="dispaly-button">
                <Table.Cell width={1}>{dataItem.obo_id}</Table.Cell>
                <Table.Cell width={1}>{dataItem.ontology_name || '-'}</Table.Cell>
                <Table.Cell width={1}>{dataItem.synonyms[0] || '-'}</Table.Cell>
                <Table.Cell width={1}>{dataItem.label || '-'}</Table.Cell>
                <Table.Cell width={1}>{dataItem.ontology_prefix || '-'}</Table.Cell>
                <Table.Cell width={1}>{dataItem.is_obsolete ? 'True' : 'False' || '-'}</Table.Cell>
                <Table.Cell width={1}>{dataItem.is_defining_ontology ? 'True' : 'False' || '-'}</Table.Cell>
                <Table.Cell width={1}>{dataItem.has_children ? 'True' : 'False' || '-'}</Table.Cell>
            </Table.Row>
        )));

    const dataListLoading = (
        <Table.Row>
            <Table.Cell colSpan={13} textAlign="center">
                <Dimmer active inverted>
                    <Loader
                        type="ThreeDots"
                        color="#00BFFF"
                        height={80}
                        width={80}
                        timeout={10000}
                        className="spinner" />
                </Dimmer>
            </Table.Cell>
        </Table.Row>
    );

    const handlePaginationChange = (e, data) => {
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


    return (
        <div>
            <Table singleLine>
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
            </Table>
            <div className="pagination-wrapper">
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
            </div>
        </div>
    );
};

export default TableCompnent;
