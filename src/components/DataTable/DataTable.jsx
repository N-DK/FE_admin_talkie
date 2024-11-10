import React, { useEffect, useState } from 'react';
import { Table, Input, Spin } from 'antd';
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
}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [total, setTotal] = useState(totalItems);
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
    }, [currentPage, pageSize, fetchData]);

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

    return (
        <div>
            <div className="flex items-center justify-end mb-4">
                <Input.Search
                    placeholder={searchPlaceholder}
                    style={{ width: 300 }}
                    onSearch={() => {}}
                />
            </div>
            <Table
                rowSelection={{}}
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
