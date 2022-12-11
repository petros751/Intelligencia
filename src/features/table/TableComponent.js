import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Dimmer, Loader, Header, Pagination, Dropdown } from 'semantic-ui-react';
import { dataSliceSelector, fetchData } from './dataSlice';

const INITIAL_FETCH_PARAMS = () => ({
    limit: 15,
    activePage: 0
});

const TableCompnent = () => {
    const [fetchDataParams, setFetchDataParams] = useState(INITIAL_FETCH_PARAMS);
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize, setPageSize] = useState(15);
    const { data, totalData, limit, activePage, totalPages, loadData } = useSelector(dataSliceSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchData(fetchDataParams));
    }, [fetchDataParams]);

    useEffect(() => {
        setPageSize(limit);
        setTotalItems(totalData);
    }, [data])

    const renderDataList = () => (!data.length
        ? (
            <Table.Row>
                <Table.Cell textAlign="center" colSpan={9}>
                    <Header as="h4">No data found!</Header>
                </Table.Cell>
            </Table.Row>
        )
        : data.map((dataItem, i) => (
            <Table.Row key={i} className="dispaly-button">
                <Table.Cell width={1}>{dataItem.obo_id || '-'}</Table.Cell>
                <Table.Cell width={1}>{dataItem.synonyms[0] || '-'}</Table.Cell>
                <Table.Cell width={1}>{dataItem.label || '-'}</Table.Cell>
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
        setFetchDataParams({ ...fetchDataParams, activePage: data.activePage - 1 });
    };

    const getPageSizeOptions = () => {
        const options = [
            {key: 15, value: 15, text: 15},
            {key: 20, value: 20, text: 20},
            {key: 25, value: 25, text: 25}
        ]
        return options;
    };

    const changePageSize = (e, data) => {
        const { value } = data;
        if (pageSize !== value) {
            setPageSize(value);
            setFetchDataParams({ ...fetchDataParams, limit: value });
        }
    };

    return (
        <div>
            <Dimmer active={loadData} inverted>
                <Loader
                    type="ThreeDots"
                    color="#00BFFF"
                    height={80}
                    width={80}
                    timeout={10000}
                    className="spinner" />
            </Dimmer>
          <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>id</Table.HeaderCell>
                        <Table.HeaderCell>Synonyms</Table.HeaderCell>
                        <Table.HeaderCell>Label</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        data ? renderDataList(data) : dataListLoading
                    }
                </Table.Body>
            </Table>
            <div className="pagination-wrapper">
                <div data-cy='total-list-items-component'>
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
                <div className="pagination">
                {
                    totalItems > pageSize
                        && (
                        <Pagination
                            activePage={activePage}
                            onPageChange={handlePaginationChange}
                            totalPages={totalPages}
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
