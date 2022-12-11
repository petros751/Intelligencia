import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Dimmer, Loader, Header, Pagination, Dropdown, Grid } from 'semantic-ui-react';
import { dataSliceSelector, fetchData } from './dataSlice';
import ChartComponent from '../chart/ChartComponent'

const MINIMUM_PAGE_SIZE = 15;
const INITIAL_FETCH_PARAMS = () => ({
    limit: 15,
    activePage: 0
});

const TableCompnent = () => {
    const [fetchDataParams, setFetchDataParams] = useState(INITIAL_FETCH_PARAMS);
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize, setPageSize] = useState(15);
    const { data, totalData, limit, activePage, totalPages } = useSelector(dataSliceSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log('fetchData');
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
        if (pageSize !== value) {
            setPageSize(value);
            setFetchDataParams({ ...fetchDataParams, limit: value });
        }
    };

    return (
        <Grid divided='vertically'>
        <Grid.Row columns={2}>
          <Grid.Column>
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
          </Grid.Column>
          <Grid.Column style={{margin: 'auto'}}>
            <ChartComponent />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
};

export default TableCompnent;
