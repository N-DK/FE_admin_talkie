import React, { useEffect, useState } from 'react';
import { Table, Input, Spin, Select, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';

const DataTable = ({
    columns,
    fetchData,
    initialPageSize = 5,
    searchPlaceholder = 'Search...',
    totalItems,
    showSizeChanger = true,
    pageSizeOptions = [5, 10, 20, 30],
    className,
    scroll,
    refreshIds,
    setRefreshIds,
    setIndexSelected,
    handleMultipleAction,
}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [total, setTotal] = useState(totalItems);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        const offset = (currentPage - 1) * pageSize;
        const loadData = async () => {
            setLoading(true);
            const response = await fetchData(offset, pageSize);
            setData(response.data || []);
            setTotal(response.total || totalItems);
            setLoading(false);
        };
        loadData();
    }, [currentPage, pageSize, fetchData, totalItems]);

    useEffect(() => {
        if (refreshIds?.length > 0) {
            setData((prev) => {
                return prev?.map((item) => {
                    return refreshIds?.includes(item?.id)
                        ? { ...item, status: !item?.status }
                        : item;
                });
            });
            setRefreshIds([]);
        }
    }, [refreshIds]);

    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
    };

    const handleSearch = (value) => {
        setCurrentPage(1);
        fetchData(0, pageSize, value).then((response) => {
            setData(response.data || []);
            setTotal(response.total || totalItems);
        });
    };

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            {
                key: 'block_multiple',
                text: t('table_block_multiple'),
                onSelect: (_) => {
                    if (selectedRowKeys?.length > 0) {
                        handleMultipleAction('block_multiple', selectedRowKeys);
                    }
                },
            },
            {
                key: 'unblock_multiple',
                text: t('table_unblock_multiple'),
                onSelect: (_) => {
                    if (selectedRowKeys?.length > 0) {
                        handleMultipleAction(
                            'unblock_multiple',
                            selectedRowKeys,
                        );
                    }
                },
            },
        ],
    };

    return (
        <div>
            <div className="flex items-center justify-end mb-4">
                {setIndexSelected && (
                    <Select
                        className="mr-4"
                        defaultValue={1}
                        style={{ width: 200 }}
                        onChange={(value) => setIndexSelected(value)}
                        options={[
                            {
                                label: t('table_post'),
                                value: 1,
                            },
                            {
                                label: t('table_post_reported'),
                                value: 0,
                            },
                        ]}
                    />
                )}
                <div>
                    <Input.Search
                        placeholder={searchPlaceholder}
                        style={{ width: 300 }}
                        onSearch={() => {}}
                    />
                </div>
            </div>
            <Table
                rowSelection={rowSelection}
                className={className}
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: total,
                    showSizeChanger: showSizeChanger,
                    pageSizeOptions: pageSizeOptions,
                    locale: {
                        items_per_page: '/ ' + t('table_items_per_page'),
                    },
                }}
                onChange={handleTableChange}
                columns={columns}
                dataSource={data}
                loading={loading}
                rowKey="id"
                scroll={{ ...scroll, y: 500 }}
            />
        </div>
    );
};

export default DataTable;
